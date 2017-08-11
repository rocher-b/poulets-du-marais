export function buildColumn(name: string, prop: string, maxWidth?: number): any {
    return {
        name: name,
        prop: prop,
        draggable: false,
        resizeable: false,
        maxWidth: maxWidth
    };
}

export function buildColumnWithEdit(name: string, prop: string): any {
    return {
        name: name,
        prop: prop,
        draggable: false,
        maxWidth: 80
    };
}

export function buildRow(obj: any): any {
    return obj;
}

export function buildRowWithEdit(obj: any, id?: any): any {
    obj.edit = {
        editButton: true,
        deleteButton: true,
        entityId: id,
        entity: obj
    };

    return obj;
}
