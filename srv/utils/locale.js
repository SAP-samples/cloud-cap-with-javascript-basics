import langparser from "accept-language-parser"
export function getLocaleReq(req){

    let lang = req.headers["accept-language"]
    if (!lang) {
        return 'en-US'
    }
    var arr = langparser.parse(lang)
    if (!arr || arr.length < 1) {
        return 'en-US'
    }
    var locale = arr[0].code
    if (arr[0].region) {
        locale += "-" + arr[0].region
    }
    return locale
}

export function getLocale(env){
    env = env || process.env
    return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE
}