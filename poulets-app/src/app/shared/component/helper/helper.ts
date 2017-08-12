import { MODE } from '../../mode-enum';

export function checkModeWithUrl(url: string): MODE {
    if (url.indexOf("edit") > -1) {
        return MODE.EDIT;
    }
    else {
        return MODE.CREATE;
    }
}
