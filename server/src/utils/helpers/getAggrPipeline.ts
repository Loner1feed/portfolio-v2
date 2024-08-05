import { Params } from "../types";

export const getAggrPipeline = (params: Params) => {
  const { page, pageSize, paramName, paramValue } = params;

  let aggregationPipeline = [];

  if (paramName && paramValue !== "")
    aggregationPipeline.push({ $match: { [paramName]: paramValue } });

  aggregationPipeline.push(
    { $sort: { dateCreated: -1 } },
    { $skip: page ? page * pageSize : 0 },
    { $limit: pageSize }
  );

  return aggregationPipeline;
};
