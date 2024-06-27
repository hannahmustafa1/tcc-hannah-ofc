/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};


var radar = document.getElementById('radar'),
    diameter = 220,
    radius = diameter / 2,
    padding = 14,
    ctx = Sketch.create({
        container: radar,
        fullscreen: false,
        width: diameter,
        height: diameter
    }),
    dToR = function (degrees) {
        return degrees * (Math.PI / 180);
    },
    sweepAngle = 270,
    sweepSize = 2,
    sweepSpeed = 1.2,
    rings = 4,
    hueStart = 120,
    hueEnd = 170,
    hueDiff = Math.abs(hueEnd - hueStart),
    saturation = 50,
    lightness = 40,
    lineWidth = 2,
    gradient = ctx.createLinearGradient(radius, 0, 0, 0);


radar.style.marginLeft = radar.style.marginTop = (-diameter / 2) - padding + 'px';
gradient.addColorStop(0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )');
gradient.addColorStop(1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )');

var renderRings = function () {
    var i;
    for (i = 0; i < rings; i++) {
        ctx.beginPath();
        ctx.arc(radius, radius, ((radius - (lineWidth / 2)) / rings) * (i + 1), 0, TWO_PI, false);
        ctx.strokeStyle = 'hsla(' + (hueEnd - (i * (hueDiff / rings))) + ', ' + saturation + '%, ' + lightness + '%, 0.1)';
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };
};




   /* document.getElementById('search-button').addEventListener('click', function() {
        // Simulação de chamada ao backend
        // Aqui você faria uma chamada AJAX para obter os dados reais
        // Exemplo:
        // fetch('/api/search', {
        //     method: 'POST',
        //     body: JSON.stringify({ uf: selectedUF, municipio: selectedMunicipio }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => response.json()).then(data => {
        //     displayResults(data);
        // });

        // Simulação de dados de resposta
        const data = [
            { type: 'Radar', uf: 'SP', municipio: 'São Paulo', info: 'Radar fixo' },
            { type: 'Concessionária', uf: 'SP', municipio: 'São Paulo', info: 'Concessionária XYZ' }
        ];
        displayResults(data);
    });

    function displayResults(data) {
        const resultsContainer = document.getElementById('results-container');
        const resultsContent = document.getElementById('results-content');
        
        resultsContent.innerHTML = ''; // Limpa os resultados anteriores

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `<strong>${item.type}</strong>: ${item.uf} - ${item.municipio} - ${item.info}`;
            resultsContent.appendChild(div);
        });

        resultsContainer.style.display = 'block';
    }


    */


    document.getElementById('search-button').addEventListener('click', function() {
        // Obtenha a UF e o município selecionados
        const selectedUFRadar = document.getElementById('uf-select-radar').value;
        const selectedMunicipioRadar = document.getElementById('municipio-select-radar').value;
        const selectedUFConcessionaria = document.getElementById('uf-select-concessionaria').value;
        const selectedMunicipioConcessionaria = document.getElementById('municipio-select-concessionaria').value;
    
        // Chamada ao backend para o endpoint de radar
        fetch(`https://government-reports.onrender.com/prfStation/radar?uf=${selectedUFRadar}&municipio=${selectedMunicipioRadar}`)
            .then(response => response.json())  // Converte a resposta em JSON
            .then(data => {
                displayResults(data);
                displayJSON(data); // Exibe a resposta JSON
            });
    
        // Chamada ao backend para o endpoint de busca
        fetch(`https://government-reports.onrender.com/prfStation/search?uf=${selectedUFConcessionaria}&municipio=${selectedMunicipioConcessionaria}`)
            .then(response => response.json())  // Converte a resposta em JSON
            .then(data => {
                displayResults(data);
                displayJSON(data); // Exibe a resposta JSON
            });
    });
    
    function displayResults(data) {
        const resultsContainer = document.getElementById('results-container');
        const resultsContent = document.getElementById('results-content');
    
        resultsContent.innerHTML = ''; // Limpa os resultados anteriores
    
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `<strong>${item.type}</strong>: ${item.uf} - ${item.municipio} - ${item.info}`;
            resultsContent.appendChild(div);
        });
    
        resultsContainer.style.display = 'block';
    }
    
    function displayJSON(data) {
        const jsonContent = document.getElementById('json-content');
        jsonContent.textContent = JSON.stringify(data, null, 2); // Exibe JSON formatado
    }
    

/*

    document.getElementById('search-button').addEventListener('click', function() {
        // Obtenha a UF e o município selecionados
        const selectedUFRadar = document.getElementById('uf-select-radar').value;
        const selectedMunicipioRadar = document.getElementById('municipio-select-radar').value;
        const selectedUFConcessionaria = document.getElementById('uf-select-concessionaria').value;
        const selectedMunicipioConcessionaria = document.getElementById('municipio-select-concessionaria').value;
    
        // Chamada ao backend para o endpoint de radar
        fetch(`https://government-reports.onrender.com/prfStation/radar?uf=${selectedUFRadar}&municipio=${selectedMunicipioRadar}`)
            .then(response => response.json())  // Converte a resposta em JSON
            .then(data => {
                displayResults(data);
            });
    
        // Chamada ao backend para o endpoint de busca
        fetch(`https://government-reports.onrender.com/prfStation/search?uf=${selectedUFConcessionaria}&municipio=${selectedMunicipioConcessionaria}`)
            .then(response => response.json())  // Converte a resposta em JSON
            .then(data => {
                displayResults(data);
            });
    });
    
    function displayResults(data) {
        const resultsContainer = document.getElementById('results-container');
        const resultsContent = document.getElementById('results-content');
        
        resultsContent.innerHTML = ''; // Limpa os resultados anteriores
    
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `<strong>${item.type}</strong>: ${item.uf} - ${item.municipio} - ${item.info}`;
            resultsContent.appendChild(div);
        });
    
        resultsContainer.style.display = 'block';
    }
    
    */



