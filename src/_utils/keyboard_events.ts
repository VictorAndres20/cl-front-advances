export const isEnterKeyPressed = (key: string) => {
    return (key === 'Enter')
}

export const enterKeyHandler = (event: React.KeyboardEvent, callBack: Function) => {
    if(isEnterKeyPressed(event.key)){
        callBack();
    }
}