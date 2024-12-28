const toVndString = (price) => {
    if (!price) return '0 VND';
    return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export {
    toVndString
}