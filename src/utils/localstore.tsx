import crypto from 'crypto-js'

export const persistData = <T,>(key:string,value:T) =>{
    const text = crypto.AES.encrypt(JSON.stringify(value),'123').toString()
    localStorage.setItem(key,text)
}

export const getPersistData =(key:string) =>{
        if(localStorage.getItem(key)){
            const bytes = crypto.AES.decrypt(`${localStorage.getItem(key) ?? ''}`,'123')
            const data =JSON.parse(bytes.toString(crypto.enc.Utf8))
            return data
        }

        return false
}