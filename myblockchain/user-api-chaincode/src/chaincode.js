/*
# Copyright Blockchain IO. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const schema = require('../assets/User');
const Joi = require('joi');
const debug = require('debug')('user-api-chaincode.src.chaincode');
const uuidv4 = require('uuid/v4');


class Chaincode {
    async Init(stub, userObj) {
        const {
            error,
            value
        } = await Joi.validate(userObj, schema);

        if (error) {
            throw new Error(error);
        }
        userObj.requestId = uuidv4();
        await stub.putState(userObj.email, Buffer.from(JSON.stringify(userObj)));
        return shim.success('Initialized Successfully!');
    }

    async Invoke(stub, userObj, ...args) {
        const {
            error,
            value
        } = await Joi.validate(userObj, schema);

        if (error) {
            throw new Error(error);
        }
        let ret = stub.getFunctionAndParameters();
        debug(ret);

        let method = this[ret.fcn];
        if (!method) {
            debug(`no function of name:  ${ret.fcn}  found`);
            throw new Error(`Received unknown function  ${ret.fcn}  invocation`);
        }
    }
}

shim.start(new Chaincode());
