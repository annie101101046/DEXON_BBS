const htmlEntities = (str) => {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const getUrlParameter = (sParam) => {
  let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName=[];

  for (let i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) 
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
  }
}

const getParseText = (str, len) => {
  let tmp = '', count = 0;
  for(let i=0;i<str.length; i++){
    if (str[i].match(/[\u4e00-\u9fa5]/g)) tmp+=str[i],count+=2
    else if (str[i].match(/[\u0800-\u4e00]/g)) tmp+=str[i],count+=2
    else if (str[i].match(/[\uff00-\uffff]/g)) tmp+=str[i],count+=2
    else tmp+=str[i],count++

    if (count >= len) break
  }
  return tmp
}

const getTitle = (content) => {
  content = getParseText(content, 42)
  const match = content.match(/^(\[).*(\])/)
  return {
    match: match,
    title: match ? match[0].substr(1,match[0].length-2) : content
  }
}

const getUser = (address) => {
  return address.replace(/^(0x.{3}).+(.{3})$/, '$1...$2')
}

export {htmlEntities, getUrlParameter, getParseText, getTitle, getUser}