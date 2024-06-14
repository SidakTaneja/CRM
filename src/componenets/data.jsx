import React from "react";

const tableData = [
    { name: 'Account', label: 'Account', type: 'Entity', module: 'Sales' },
    { name: 'BpmnProcess', label: 'Process', type: 'Workflow', module: 'Advanced' },
    { name: 'BpmnUserTask', label: 'Process User Task', type: 'Task', module: 'Advanced' },
    { name: 'Call', label: 'Call', type: 'Communication', module: 'Support' },
    { name: 'Campaign', label: 'Campaign', type: 'Marketing', module: 'Sales' },
    { name: 'Case', label: 'Case', type: 'Support', module: 'Support' },
    { name: 'Contact', label: 'Contact', type: 'Entity', module: 'Sales' },
    { name: 'DeliveryOrder', label: 'Delivery Order', type: 'Logistics', module: 'Sales' },
    { name: 'DeliveryOrderItem', label: 'Delivery Order Item', type: 'Logistics', module: 'Sales' },
    { name: 'Document', label: 'Document', type: 'File', module: 'General' },
];

export function updatetable(name, label, type) {
    const newEntry = {
        name: name,
        label: label,
        type: type,
        module: "Custom"
    };

    tableData.push(newEntry);
    console.log(JSON.stringify(tableData, null, 2));
}

export function getTable() {
    return tableData;
}