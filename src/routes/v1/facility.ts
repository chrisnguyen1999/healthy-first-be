import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';

import {
    createFacilityController,
    deleteFacilityController,
    getFacilitiesController,
    getFacilityController,
    updateFacilityController,
} from '@/controllers';
import { checkAuth } from '@/middlewares';
import {
    schemaAuthAuthorization,
    schemaFacilityCreate,
    schemaFacilityUpdate,
    schemaGetFacilities,
    schemaMongoIdParam,
    schemaRecordQuery,
} from '@/validators';

export const facilityRouter = Router();

facilityRouter.use(
    celebrate({
        [Segments.HEADERS]: schemaAuthAuthorization,
    }),
    checkAuth
);

facilityRouter
    .route('/')
    .get(
        celebrate({
            [Segments.QUERY]: schemaGetFacilities,
        }),
        getFacilitiesController
    )
    .post(
        celebrate({
            [Segments.BODY]: schemaFacilityCreate,
        }),
        createFacilityController
    );

facilityRouter
    .route('/:id')
    .get(
        celebrate({
            [Segments.PARAMS]: schemaMongoIdParam,
            [Segments.QUERY]: schemaRecordQuery,
        }),
        getFacilityController
    )
    .patch(
        celebrate({
            [Segments.PARAMS]: schemaMongoIdParam,
            [Segments.BODY]: schemaFacilityUpdate,
        }),
        updateFacilityController
    )
    .delete(
        celebrate({
            [Segments.PARAMS]: schemaMongoIdParam,
        }),
        deleteFacilityController
    );