
function onScroll() {
  const sections = document.querySelectorAll('.sections section');
  const scrollPosition = window.scrollY;
  var sumOffset = 0;

  sections.forEach(section => {
    const sectionId = section.getAttribute('id');
    const link = document.getElementById(`li-${sectionId}`);
    sumOffset += section.offsetHeight;

    if (scrollPosition > sumOffset -1000 && scrollPosition < sumOffset) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', onScroll);




document.querySelectorAll('#toc a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.getElementById(targetId);
    //const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});

function loadSections() {
  
  fetch('page.txt', {mode:'no-cors'})
    .then(response => response.text())
    .then(data => {
      const sections = data.split(/(?<!#)#(?!#)/);

      sections.forEach(section => {
        section = section.trim();
        if(section.length > 0){
          const sectionName = section.substring(0, section.indexOf('\n')).trim();
          section = section.substring(section.indexOf('\n'));
          const sectionElement = document.getElementById(sectionName.toLowerCase());

          const subSections = section.split('##');

          subSections.forEach(subSection => {
            subSection = subSection.trim();
            if (subSection.length > 0) {

              const subSectionElement = document.createElement('div');
              subSectionElement.classList.add('card');

              let imgElement = null;
              let refElement = null;


              const subSectionName = subSection.substring(
                0, subSection.indexOf('\n')).trim();
              content = subSection.substring(subSection.indexOf('\n'));
              
              if(content.indexOf("@@") != -1){
                img = content.substring(content.indexOf('@@')).trim();
                img = img.replace("@@", "").trim();
                content = content.substring(0, content.indexOf("@@"))
                const imgWrapElement = document.createElement('div');
                imgWrapElement.classList.add('card-img-wrap');

                imgElement = document.createElement('img');
                imgElement.classList.add('card-img');
                imgElement.src = img;
                imgWrapElement.appendChild(imgElement);
                subSectionElement.appendChild(imgWrapElement);
              }

              if(content.indexOf("$$") != -1){
                ref = content.substring(content.indexOf('$$')).trim();
                ref = ref.replace("$$", "").trim();
                content = content.substring(0, content.indexOf("$$"))
                const svgWrapElement = document.createElement('div');
                svgWrapElement.classList.add('card-svg-wrap');

                refElement = document.createElement('a');
                refElement.href = ref;
                refElement.target = "_blank";
                refElement.classList.add('card-link');
                const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svgElement.setAttribute("height", "16");
                svgElement.setAttribute("width", "16");
                svgElement.setAttribute("viewBox", "0 0 512 512");

                const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathElement.setAttribute("d", "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"); 

                svgElement.appendChild(pathElement);
                refElement.appendChild(svgElement);
                svgWrapElement.appendChild(refElement);
                subSectionElement.appendChild(svgWrapElement);
              }

              content = content.trim().replace(/\n/g, '<br>');

              const contentElement = document.createElement('div');

              const subSectionTitleElement = document.createElement('h2');
              subSectionTitleElement.classList.add('card-h2');
              subSectionTitleElement.textContent = subSectionName;
              const textElement = document.createElement('div');
              textElement.classList.add('content');
              textElement.innerHTML = `<p>${content}</p>`;

              contentElement.appendChild(subSectionTitleElement);
              contentElement.appendChild(textElement);

              subSectionElement.appendChild(contentElement);

              sectionElement.appendChild(subSectionElement);

            }
          })
        }
      })
    })
}

window.addEventListener('DOMContentLoaded', loadSections)

window.addEventListener('DOMContentLoaded', onScroll);








