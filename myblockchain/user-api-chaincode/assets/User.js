#!/usr/bin/env node

'use strict';


const Joi = require('joi');

const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    data: Joi.object()
});

module.exports = {
    userSchema
};
