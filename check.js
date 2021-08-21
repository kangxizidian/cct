/* check if the tag is balance , and warn for null tag*/

import { readdirSync,readFileSync } from "fs";

const files=readdirSync('.');

const checkxml=content=>{

    const lines=content.split(/\r?\n/);
    const tagstack=[];
    lines.forEach((line,idx)=>{
        line.replace(/<([^>]+)>/g,(m,tag)=>{
            if (tag[tag.length-1]=='/') {
                console.log('cannot have null tag, line:',idx+1)
                return;
            }
            const at=tag.indexOf(' ');
            const tagname=(at>-1)?tag.substring(0,at):tag;
            if (tagname[0]!=='/') {
                tagstack.push([tagname,idx ]);
            } else {
                if (!tagstack[tagstack.length-1]) {
                    console.log('closing tag without opening',tagname,'line',idx+1);
                    return;
                }
                if (tagstack[tagstack.length-1][0] !== tagname.substring(1)) {
                    console.log('unmatched tag',tagname,'line',idx+1,'open tag',tagstack[tagstack.length-1])
                }
                tagstack.pop();
            }
        })
    })
}

files.forEach(file=>{
    if (file.indexOf('.htm')==-1) return;
    if (file==='index.htm' || file==='index.html')return;
    console.log('checking ',file)
    const content=readFileSync(file,'utf8');
    const start=content.indexOf('<xml>');
    const end=content.indexOf('</xml>');
    if ((start==-1 || end==-1) ) {
        console.log('not enclosed by <xml>')
        return;
    }
    checkxml( content.substring(start,end+6));
})