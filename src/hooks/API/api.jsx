import axios from "axios";

export async function getEntity() {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/entity');
        return response.data;
    } catch (error) {
        throw { error }
    }
}

export async function getfields(id) {
    try {
        const response =
            await axios.get('http://localhost:8080/entity-management/entity/' + id);
        return response.data.fields;
    } catch (error) {
        throw { error }
    }
}

export async function getDefaultfields(id) {
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