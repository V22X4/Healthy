export const toDarkMode = () => {
    document.documentElement.style.setProperty('--col1', '#282b2d');
    document.documentElement.style.setProperty('--col2', '#242729');
    document.documentElement.style.setProperty('--textcol', '#ffffff');
    document.documentElement.style.setProperty('--mdtextcol', '#ffffff');
    document.documentElement.style.setProperty('--chat-hover', '#7ccbd7');
    document.documentElement.style.setProperty('--chat-highlighted', '#19766e');
    document.documentElement.style.setProperty('--share-button', '#365d25');
};

export const toLightMode = () => {
    document.documentElement.style.setProperty('--col1', '#c7dbff');
    document.documentElement.style.setProperty('--col2', '#d4e4ff');
    document.documentElement.style.setProperty('--chat-hover', '#267480');
    document.documentElement.style.setProperty('--textcol', '#000000');
    document.documentElement.style.setProperty('--mdtextcol', 'defualt');
    document.documentElement.style.setProperty('--chat-highlighted', '#1f9389');
    document.documentElement.style.setProperty('--share-button', '#a5d9a1');
};


 