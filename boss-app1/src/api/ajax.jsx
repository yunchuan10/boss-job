

import axios from 'axios'

export default (url='', data={}, type='GET')  => {
    let str = '';
    if( type=='GET' ){
        for(var i in data){
            str += i+'='+data[i]+'&'
        }
        str? str = str.substring(0, str.length-1): str;
        // 使用axios发get请求
        return axios.get(url + '?' + str);
    }else{
        return axios.post(url, data)
    }

}




