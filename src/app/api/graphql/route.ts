// src/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import { gql } from 'graphql-tag';

const prisma = new PrismaClient();

const typeDefs = gql`
  type Image {
    id: ID!
    src: String!
    alt: String!
    background: String!
  }

  type Query {
    images: [Image!]!
  }

  input ImageInput {
    src: String!
    alt: String!
    background: String!
  }

  input UpdateImageInput {
    id: ID!
    src: String
    alt: String
    background: String
  }

  type Mutation {
    addImages(images: [ImageInput!]!): [Image!]!
    updateImage(image: UpdateImageInput!): Image!
  }
`;

const resolvers = {
  Query: {
    images: async () => await prisma.image.findMany(),
  },
  Mutation: {
    addImages: async (_: any, { images }: { images: Array<{ src: string; alt: string; background: string }> }) => {
      await prisma.image.createMany({
        data: images,
      });
      const newImages = await prisma.image.findMany({
        where: {
          src: {
            in: images.map(image => image.src),
          },
        },
      });
      return newImages;
    },
    updateImage: async (_: any, { image }: { image: { id: string, src?: string, alt?: string, background?: string } }) => {
      const updatedImage = await prisma.image.update({
        where: { id: parseInt(image.id) },
        data: {
          src: image.src,
          alt: image.alt,
          background: image.background,
        },
      });
      return updatedImage;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
