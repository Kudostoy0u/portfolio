const post=async(t,n)=>{const o=await fetch(t,{method:"post",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(n)});return await o.json()};

const Editor = toastui.Editor
document.write(Editor)
var editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
});
const $ = document.querySelector.bind(document)
document.querySelector(".btn").addEventListener("click", async () => {
    const data = await post("/", {
        title: $("#title").value,
        imageUrl: $("#picture").value,
        markdown: editor.getMarkdown(),
        html: editor.getHtml(),
        date: new Date().toLocaleDateString('en-US')
    })
    Swal.fire(data ? {
        icon: 'success',
        title: 'Success!',
        text: 'Post posted!'
    } : {
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
})