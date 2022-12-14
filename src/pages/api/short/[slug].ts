import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from '../../../server/trpc/router/_app';
import { createContext } from "../../../server/trpc/context";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await createContext({req,res});
  const caller = appRouter.createCaller(ctx);
  try {
    // make request here
    const slug = req.query["slug"];
    if (!slug || typeof slug !== 'string') {
      res.status(404).json({message: 'please use with a slug'});
      return;
    }
    const data = await caller.short.getById(slug);
    if (!data) {
      res.status(404).json({message: 'slug not found'});
      return;
    }
    res.status(200).json(data);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // error from trpc
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    console.error(cause);
    res.status(500).json({message: "Internal server error"});
  }
}

export default handler;