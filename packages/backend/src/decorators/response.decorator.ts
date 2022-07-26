import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiBaseResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            default: 200,
          },
          data: { $ref: getSchemaPath(model) },
          message: {
            type: 'string',
          },
        },
      },
    }),
  );
};
export const ApiBooleanResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            default: 200,
          },
          message: {
            type: 'string',
          },
          data: {
            type: 'boolean',
            default: true,
          },
        },
      },
    }),
  );
};
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            default: 200,
          },
          message: {
            type: 'string',
          },
          data: {
            type: 'object',
            properties: {
              pageNo: {
                type: 'number',
                default: 1,
              },
              pageSize: {
                type: 'number',
                default: 1,
              },
              total: {
                type: 'number',
                default: 10,
              },
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        },
      },
    }),
  );
};
