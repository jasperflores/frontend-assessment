$(document).ready(function(){
    // Setting the three columns height equally by getting the element 
    // that has a higher height and adding a timeout function
    setTimeout(function() {
        var maxHeight = 0;

        $(".three-column .inner-column-wrapper").each(function(){
           if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
        });
        
        $(".three-column .inner-column-wrapper").height(maxHeight);
    }, 200)


    fetch("../../data.json")
        .then(function (response) {
            return response.json();
        })  
        .then(function (data) {
            appendData(data);
          })
        .catch(function (err) {
            // If an error occured, you will catch it here
        });
    function appendData(data) {
        const myTab = document.getElementById("myTab");
        const myTabContent = document.getElementById("myTabContent")
        const btnActive = myTab.getElementsByClassName("nav-link");
        
        
       for (var i = 0; i < data.length; i++) {

            const button = document.createElement("button");
            const list = document.createElement("li");
            
            list.className = "nav-item";
            list.setAttribute("role", "presentation");
            
            button.textContent = data[i].title;
            button.className = "nav-link";
            setAttributes(button, {
                "id": "section-tab-"+i, 
                "type": "button",
                "data-bs-target": "#section-"+i,
                "data-bs-toggle": "tab",
            });
            
            myTab.append(list);
            list.appendChild(button);

            btnActive[i].addEventListener("click", function() {
                const current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            }); 

            const mainDiv = document.createElement("div");

            mainDiv.innerHTML = data[i].content;
            mainDiv.className = "tab-pane fade";
            setAttributes(mainDiv, {
                "id": "section-"+i, 
                "role": "tabpanel",
                "aria-labelledby": "section-tab-"+i,
            });
             
            myTabContent.appendChild(mainDiv);
            $("ul.nav .nav-item:first-child>.nav-link").addClass("active");
            $(".tab-content>.tab-pane:first-child").addClass("active show");
       }

      
       function setAttributes(el, attrs) {
        for(var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
      }
        
    }

});