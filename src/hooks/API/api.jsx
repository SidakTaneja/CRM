import axios from "axios";
import { useState } from "react";

export async function getEntity() {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/entity');
        return response.data;
    } catch (error) {
        throw { error }
    }
}

export async function deleteEntity(id) {
    try {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/entity-management/entity/' + id,
            headers: {
                'X-TenantId': 'crm',
                'Content-Type': 'application/json'
            }
        };
        const response = await axios(config)
        return response.data;
    } catch (error) {
        throw { error }
    }
}

export async function updateEntity(
    id,
    singular,
    plural
) {
    try {
        const data = {
            // name: "Manish",
            // type: "base",
            singular_label: singular,
            plural_label: plural,
            // color: "#ffffff",
            // icon: "fas-fa icon",
            // description: "This is the test table"
        };

        const config = {
            method: 'put',
            url: 'http://localhost:8080/entity-management/entity/' + id,
            headers: {
                'X-TenantId': 'crm',
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios(config);
        return response
    } catch (error) {
        throw { error };
    }
}

export async function updateField(
    entityid,
    fieldid,
    label,
    description,
    def
) {
    try {
        const data = {
            label: label,
            default_value: def,
            description: description,
        };

        const config = {
            method: 'put',
            url: 'http://localhost:8080/entity-management/entity/fields/' + fieldid + "?entityId=" + entityid,

            headers: {
                'X-TenantId': 'crm',
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios(config);
        return response
    } catch (error) {
        throw { error };
    }
}

export async function getFieldTypes() {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/category-value');
        return response.data;
    } catch (error) {
        throw { error }
    }
}

export async function getFields(id) {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/entity/' + id);
        return response.data.fields;
    } catch (error) {
        throw { error }
    }
}

export async function getEnityData(id) {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/entity/' + id);
        return response.data;
    } catch (error) {
        throw { error }
    }
}

export async function getDefaultFields(id) {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/base/entity/' + id);
        return response.data;
    } catch (error) {
        throw { error }
    }
}

export async function createEntity(
    entityName,
    entityType,
    entitySingularLabel,
    entityPluralLabel,
    entityFields
) {
    try {
        const data = {
            name: entityName,
            type: entityType,
            singular_label: entitySingularLabel,
            plural_label: entityPluralLabel,
            color: "#ffffff",
            icon: "fas-fa icon",
            description: "This is the test table",
            fields: entityFields
        };

        const config = {
            method: 'post',
            url: 'http://localhost:8080/entity-management/entity',
            headers: {
                'X-TenantId': 'crm',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const response = await axios(config);
        return response
    } catch (error) {
        throw { error };
    }
}

export async function addField(
    id,
    name,
    label,
    def,
    description,
    // char,
    type
) {
    try {
        const data = {
            name: name,
            required: false,
            is_unique: null,
            label: label,
            type: type,
            options: null,
            default_value: def,
            description: description,
            field_name: name,
            active: true
        };

        const config = {
            method: 'post',
            url: 'http://localhost:8080/entity-management/entity/fields/' + id,
            headers: {
                'X-TenantId': 'crm',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const response = await axios(config);
        return response.data
    } catch (error) {
        throw { error };
    }
}