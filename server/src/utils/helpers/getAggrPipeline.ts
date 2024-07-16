import { Params } from "../types";

export const getAggrPipeline = (params: Params) => {
  const { page, pageSize, paramName, paramValue } = params;

  let aggregationPipeline = [];

  if (paramName && paramValue !== "")
    aggregationPipeline.push({ $match: { [paramName]: paramValue } });

  aggregationPipeline.push(
    { $skip: page ? page * pageSize : 0 },
    { $sort: { createdDate: 1 } },
    { $limit: pageSize }
  );

  return aggregationPipeline;
};
