import AWS from "aws-sdk";
import * as fs from "fs";

AWS.config.update({
  region: 'eu-north-1',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "images-cloud-gallery";

const schemaData: { layout: { type: string; spacing: number; columns: number }; actions: { name: string; icon: string; action: string; color: string }[] } = 
  JSON.parse(fs.readFileSync("src/schema.json", "utf-8"));

export const resolvers = {
  Query: {
    schema: async () => {
      try {
        const params = {
          TableName: tableName,
        };
        const result = await dynamoDB.scan(params).promise();
        const images = result.Items || [];

        return {
          layout: schemaData.layout,
          actions: schemaData.actions,
          images,
        };
      } catch (error) {
        console.error("Error fetching data: ", error);
        return {
          layout: schemaData.layout,
          actions: schemaData.actions,
          images: [],
        };
      }
    },
  },
  Mutation: {
    addLike: async (_: unknown, { id }: { id: string }) => {
      try {
        const params = {
          TableName: tableName,
          Key: { id },
          UpdateExpression: "SET likes = likes + :inc",
          ExpressionAttributeValues: { ":inc": 1 },
          ReturnValues: "ALL_NEW",
        };
        const result = await dynamoDB.update(params).promise();
        return result.Attributes as any;
      } catch (error) {
        console.error("Error adding like: ", error);
        throw new Error("Image not found");
      }
    },
    removeLike: async (_: unknown, { id }: { id: string }) =>{
        try {
          const params = {
          TableName: tableName,
          Key: { id },
          UpdateExpression: "SET likes = likes - :dec",
          ExpressionAttributeValues: { ":dec": 1 },
          ReturnValues: "ALL_NEW",
        };
        const result = await dynamoDB.update(params).promise();
        return result.Attributes as any;
        } catch (error) {
          console.error("Error removing like: ", error);
          throw new Error("Image not found");
        }
    },
    deleteImage: async (_: unknown, { id }: { id: string }) => {
      try {
        const params = {
          TableName: tableName,
          Key: { id },
        };

        await dynamoDB.delete(params).promise();
        return true;
      } catch (error) {
        console.error("Error deleting image: ", error);
        return false;
      }
    },
    markFeatured: async (_: unknown, { id }: { id: string }) => {
      try {
        const getParams = {
          TableName: tableName,
          Key: { id },
        };
    
        const getResult = await dynamoDB.get(getParams).promise();
        const image = getResult.Item;
    
        if (!image) {
          throw new Error("Image not found");
        }
    
        const newStatus = !image.isFeatured;
    
        const updateParams = {
          TableName: tableName,
          Key: { id },
          UpdateExpression: 'SET isFeatured = :status',
          ExpressionAttributeValues: {
            ':status': newStatus
          },
          ReturnValues: 'ALL_NEW'
        };
    
        const updateResult = await dynamoDB.update(updateParams).promise();
    
        return updateResult.Attributes as any;
      } catch (error) {
        console.error("Error marking image as featured: ", error);
        throw new Error("Image not found");
      }
    }
  },
};
