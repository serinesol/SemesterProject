
function loadTemplate(templateID, destinationElement, emptyElement = false){ //destinationElement er DOM-elementet vi skal putte templaten inn i
    const template = document.getElementById(templateID);
    if(template.content){
        const clone = template.content.cloneNode(true);
        if(emptyElement){
            emptyContainerElement(destinationElement);
        }
        destinationElement.appendChild(clone);
    }else{
        console.log("your browser doesn't support templates")
    }
}

function emptyContainerElement(element){
    let child = element.firstChild();
    while(child){
        element.removeChild(child);
        child = element.firstChild;
    }
}