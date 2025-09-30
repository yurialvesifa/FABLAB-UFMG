// FabLab UFMG — Vanilla JS build (sem React)
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Dataset de equipamentos
  const equipment = [
    {name: "Bancada multiuso reforçada 790×480×600 (VONDER)", category: "marcenaria", image: "Imagens/Bancada multiuso reforçada 790×480×600 (VONDER).jpg"},
    {name: "Câmera de ação Insta360 X3", category: "imagem", image: "Imagens/Câmera de ação Insta360 X3.png"},
    {name: "Câmera Termográfica HIKMICRO M30", category: "imagem", image: "Imagens/Câmera Termográfica HIKMICRO M30.png"},
    {name: "Fresadora CNC Router Rhino RMC 3000 1S Plus", category: "metal", image: "Imagens/Fresadora CNC Router Rhino RMC 3000 1S Plus.png"},
    {name: "Furadeira/ parafusadeira de impacto DeWALT", category: "corte", image: "Imagens/Furadeira_parafusadeira de impacto DeWALT DCD778D2 (20V).png"},
    {name: "Máquina de corte e gravação a laser Duplotech DJ‑1310", category: "corte", image: "Imagens/Máquina de corte e gravação a laser Duplotech DJ‑1310 (150W).png"},
    {name: "Máquina de solda Boxer MIGFLEX 280", category: "soldagem", image: "Imagens/Máquina de solda Boxer MIGFLEX 280.png"},
    {name: "Meta Quest 2", category: "vr-ar", image: "Imagens/meta quest 2.jpg"},
    {name: "Osciloscópio Digital Rigol DHO814 (100 MHz, 4 ch, 12 bits)", category: "eletronica", image: "Imagens/Osciloscópio Digital Rigol DHO814 (100 MHz, 4 ch, 12 bits).webp"},
    {name: "Plotter de recorte profissional Graphtec CE7000", category: "corte", image: "Imagens/Plotter de recorte profissional Graphtec CE7000.jpg"},
    {name: "Prensa termica", category: "corte", image: "Imagens/Prensa termica.png"},
    {name: "Scanner 3D de mão Shining 3D EINSTAR (VCSEL IR)", category: "imagem", image: "Imagens/Scanner 3D de mão Shining 3D EINSTAR (VCSEL IR).jpg"},
    {name: "Scanner 3D EinScan SP V2 (luz branca, mesa giratória))", category: "imagem", image: "Imagens/Scanner 3D EinScan SP V2 (luz branca, mesa giratória).jpg"},

   
];

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'marcenaria', label: 'Marcenaria' },
    { id: 'corte', label: 'Corte e Gravação' },
    { id: 'impressao3d', label: 'Impressão 3D' },
    { id: 'eletronica', label: 'Eletrônica' },
    { id: 'eletrica', label: 'Elétrica' },
    { id: 'digitalizacao', label: 'Digitalização 3D' },
    { id: 'soldagem', label: 'Soldagem' },
    { id: 'imagem', label: 'Imagem/Foto/VR' },
    { id: 'audiovisual', label: 'Audiovisual' },
    { id: 'metal', label: 'Metal' },
    { id: 'mobilia', label: 'Mobiliário' },
    { id: 'vr-ar', label: 'VR/AR' },
  ];

  function filterEquipment(list, query, category){
    const q = (query||'').toLowerCase();
    return list.filter(e => {
      const txt = (e.name + ' ' + (e.patrimonio||'') + ' ' + e.category).toLowerCase();
      const matchText = txt.includes(q);
      const matchCat = category === 'todos' || e.category === category;
      return matchText && matchCat;
    });
  }

  function renderCategories(){
    const sel = $('#category');
    sel.innerHTML = categories.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
    sel.value = 'todos';
  }

  function cardTemplate(item){
    return `
    <article class="item">
      <div class="thumb"><img src="${item.image}" alt="${item.name}"></div>
      <div class="body">
        <h4>${item.name}</h4>
          <div class="meta">
          ${item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" rel="noreferrer">fonte</a>` : ''}
        </div>
      </div>
    </article>`;
  }

  function renderGrid(list){
    $('#grid').innerHTML = list.map(cardTemplate).join('');
  }

  function main(){
    $('#year').textContent = new Date().getFullYear();
    renderCategories();

    const search = $('#search');
    const cat = $('#category');

    const apply = () => {
      const shown = filterEquipment(equipment, search.value, cat.value);
      renderGrid(shown);
    };

    // initial render
    apply();

    // events
    search.addEventListener('input', apply);
    cat.addEventListener('change', apply);

    // Smoke tests (console)
    try{
      const sample = [
        { name: 'Rigol DHO814', patrimonio: '1046', category: 'eletronica' },
        { name: 'Rigol DG1022Z', patrimonio: '1996', category: 'eletronica' },
        { name: 'Plotter de recorte', patrimonio: '2033–2034', category: 'corte' },
        { name: 'Laser Duplotech', patrimonio: '2722', category: 'corte' },
        { name: 'Meta Quest 2', patrimonio: '2816–2826', category: 'vr-ar' },
      ];
      console.assert(filterEquipment(sample, 'Rigol', 'todos').length == 2, 'TEST: query Rigol should find 2');
      console.assert(filterEquipment(sample, '', 'corte').length >= 2, 'TEST: category corte should be >= 2');
      console.assert(filterEquipment(sample, '1046', 'todos').length == 1, 'TEST: patrimonio 1046 should find 1');
      console.assert(filterEquipment(sample, '', 'vr-ar').length == 1, 'TEST: vr-ar should be 1');
      console.log('[OK] Smoke tests passed');
    }catch(e){ console.warn('Smoke tests skipped', e); }
  }

  document.addEventListener('DOMContentLoaded', main);
})();

//teste se funciona
