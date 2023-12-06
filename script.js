
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
                refElement = document.createElement('a');
                refElement.href = ref;
                const svgElement = document.createElement('svg');
                refElement.appendChild(svgElement);
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








