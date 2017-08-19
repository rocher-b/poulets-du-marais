import { MODE } from '../../mode-enum';

export function checkModeWithUrl(url: string): MODE {
    if (url.indexOf("edit") > -1) {
        return MODE.EDIT;
    }
    else if (url.indexOf("create") > -1) {
        return MODE.CREATE;
    }
    else {
        return null;
    }
}

export function roundNumber(number: number) {
    return (Math.round(number * 1000) / 1000);
}
