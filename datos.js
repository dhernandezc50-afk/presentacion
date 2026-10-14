/* =====================================================================
   DATOS Y CONTENIDO DE LA PRESENTACIÓN  (editable)
   n = 31. Los porcentajes principales son los de la investigación.
   Las categorías marcadas con (*) son el complemento calculado hasta 100%.
   Si tienen el desglose exacto de cada ítem, reemplácenlo aquí.
   ===================================================================== */
const N = 31;
const ROSE = "#c8566b", GOLD = "#d9a85b", SAGE = "#6fb3a2", REST = "#3a3a46";

const CHARTS = [
 { n:1, title:"Necesidad constante de atención", main:71, mainLbl:"presenta algún grado",
   data:[["Presenta en algún grado",71.0,ROSE],["No la presenta (*)",29.0,REST]],
   insight:"Siete de cada diez participantes manifiestan necesitar atención constante de su pareja." },
 { n:2, title:"Preocupación por el término de la relación", main:61.3, mainLbl:"a veces + siempre",
   data:[["A veces",48.4,GOLD],["Siempre",12.9,ROSE],["Otras respuestas (*)",38.7,REST]],
   insight:"El miedo a que la relación termine es frecuente: 48.4% lo siente a veces y 12.9% siempre." },
 { n:3, title:"Renuncia a actividades personales por la pareja", main:61.2, mainLbl:"renuncia en total",
   data:[["A veces",54.8,GOLD],["Casi siempre / siempre (*)",6.4,ROSE],["No renuncia (*)",38.8,REST]],
   insight:"Más de seis de cada diez dejan de lado sus propias actividades; 54.8% lo hace a veces." },
 { n:4, title:"Dificultad para tomar decisiones sin la pareja", main:51.6, mainLbl:"tiene dificultad",
   data:[["Tiene dificultad",51.6,ROSE],["No la tiene (*)",48.4,REST]],
   insight:"Más de la mitad reconoce que le cuesta decidir sin contar con su pareja." },
 { n:5, title:"Estado de ánimo según el estado de la relación", main:32.2, mainLbl:"casi siempre / siempre",
   data:[["Casi siempre / siempre",32.2,ROSE],["Otras respuestas (*)",67.8,REST]],
   insight:"Para 1 de cada 3 jóvenes, su ánimo depende casi siempre de cómo va la relación." },
 { n:6, title:"Señales de dependencia identificadas", main:74.2, mainLbl:"necesidad de aprobación",
   data:[["Necesidad de aprobación",74.2,ROSE],["Otras señales / ninguna (*)",25.8,REST]],
   insight:"La necesidad de aprobación es la señal que más reconocen los participantes." },
 { n:7, title:"Factores que favorecen la dependencia", main:64.5, mainLbl:"baja autoestima",
   data:[["Baja autoestima",64.5,SAGE],["Otros factores (*)",35.5,REST]],
   insight:"La baja autoestima es el factor que la mayoría identifica como favorecedor." },
 { n:8, title:"Impacto en la autoestima", main:87.1, mainLbl:"disminuye la confianza",
   data:[["Disminuye la confianza en sí mismo/a",87.1,ROSE],["No afecta (*)",12.9,REST]],
   insight:"Casi nueve de cada diez afirman que la dependencia emocional reduce su confianza personal." }
];

/* Reparto de exposición: 3 integrantes, ~7-8 min cada una */
const D = "Daniela Hernández", A = "Astrid Robles", K = "Katherine Conquera";

const SLIDES = [];

/* 1 · Portada */
SLIDES.push({ nav:"Portada", who:D, html:`
 <div class="cover">
  <div>
   <div class="uni rv"><b>Universidad Mariano Gálvez de Guatemala</b><br>Facultad de Psicología Industrial</div>
   <div class="tag rv">Defensa de Tesina</div>
   <h1 class="rv">Dependencia Emocional en las <em>Relaciones de Pareja</em> de Jóvenes Adultos</h1>
   <ul class="authors rv">
     <li><i></i>Daniela Yeneri Hernández Contreras</li>
     <li><i></i>Astrid Pamela Robles Gómez</li>
     <li><i></i>Katherine Fabiola Conquera Álvarez</li>
   </ul>
   <div class="date rv">Guatemala, octubre de 2026</div>
  </div>
  <div class="cover-side">
   <div class="hero-logo rv"><img src="logo.png" alt="Sello UMG"></div>
   <div class="qrbox rv">
    <div class="tag">Abrir en el móvil</div>
    <div id="qrcode"></div>
    <small>Escanee el código con la cámara para ver la presentación.</small>
    <input id="qrurl" placeholder="Pegue aquí el enlace público (https://...)">
    <button id="qrbtn">Generar QR</button>
   </div>
  </div>
 </div>`});

/* 2 · Introducción */
SLIDES.push({ nav:"Introducción", who:D, html:`
 <div class="tag rv">01 · Introducción</div>
 <h2 class="rv">Contexto del <em>estudio</em></h2>
 <div class="grid g2">
  <div class="card rv"><h3>La etapa de la adultez joven</h3>
   <p>En la universidad, los jóvenes consolidan su identidad, su autonomía y sus primeros vínculos afectivos estables. Es una etapa clave para aprender a relacionarse de forma saludable.</p></div>
  <div class="card rv"><h3>El problema de fondo</h3>
   <p>Cuando la pareja se convierte en la principal fuente de valor personal, puede aparecer la <strong>dependencia emocional</strong>: una necesidad afectiva excesiva que limita la libertad y el bienestar.</p></div>
 </div>
 <div class="kpis">
  <div class="kpi rv"><div class="n" data-count="31">31</div><div class="t">jóvenes universitarios</div></div>
  <div class="kpi rv"><div class="n">18–31</div><div class="t">años de edad</div></div>
  <div class="kpi rv"><div class="n" style="font-size:1.5rem;padding-top:.55rem">Villa Canales</div><div class="t">Guatemala</div></div>
  <div class="kpi rv"><div class="n" data-count="8">8</div><div class="t">indicadores analizados</div></div>
 </div>`});

/* 3 · Síntesis del tema */
SLIDES.push({ nav:"Síntesis del tema", who:D, html:`
 <div class="tag rv">02 · Síntesis del tema</div>
 <h2 class="rv">¿Qué es la <em>dependencia emocional</em>?</h2>
 <div class="grid g3">
  <div class="card accent rv"><span class="num">1</span><h3>Castelló</h3>
   <p>La describe como una necesidad afectiva extrema que la persona siente hacia su pareja, y que tiende a repetirse a lo largo de distintas relaciones.</p></div>
  <div class="card rv"><span class="num">2</span><h3>Bowlby</h3>
   <p>Desde la teoría del apego, los vínculos tempranos moldean la forma de relacionarse en la adultez; un apego inseguro puede derivar en búsqueda excesiva de cercanía y miedo al abandono.</p></div>
  <div class="card rv"><span class="num">3</span><h3>Moral &amp; Sirvent</h3>
   <p>La entienden como un patrón de demandas afectivas desadaptativas hacia la pareja, asociado al miedo a la soledad y a la baja autoestima.</p></div>
 </div>
 <div style="margin-top:22px" class="rv"><span class="pill">Miedo al abandono</span><span class="pill">Necesidad de aprobación</span><span class="pill">Subordinación</span><span class="pill">Baja autoestima</span></div>`});

/* 4 · Justificación */
SLIDES.push({ nav:"Justificación", who:D, html:`
 <div class="tag rv">03 · Justificación</div>
 <h2 class="rv">¿Por qué es importante <em>estudiarlo</em>?</h2>
 <div class="grid g2">
  <div class="card rv"><h3>Relaciones sanas</h3><p>Identificar la dependencia permite promover vínculos basados en el respeto, la reciprocidad y el afecto libre, no en la necesidad.</p></div>
  <div class="card rv"><h3>Límites personales</h3><p>Reconocer y sostener límites protege la identidad, la autonomía y las metas individuales dentro de la pareja.</p></div>
  <div class="card rv"><h3>Salud mental</h3><p>Se vincula con ansiedad, baja autoestima y pérdida de autonomía; detectarla a tiempo previene consecuencias mayores.</p></div>
  <div class="card rv"><h3>Aporte local</h3><p>Hay poca evidencia sobre jóvenes universitarios de Villa Canales; este estudio aporta datos de su propio contexto.</p></div>
 </div>`});

/* 5 · Problema */
SLIDES.push({ nav:"Formulación del problema", who:D, html:`
 <div class="tag rv">04 · Formulación del problema</div>
 <h2 class="rv">Pregunta central de investigación</h2>
 <p class="question rv">¿Cómo influye la <em>dependencia emocional</em> en las relaciones de pareja de jóvenes adultos?</p>`});

/* 6 · Hipótesis y variables */
SLIDES.push({ nav:"Hipótesis y variables", who:A, html:`
 <div class="tag rv">05 · Hipótesis y variables</div>
 <h2 class="rv">Hipótesis de <em>investigación</em></h2>
 <div class="grid g2">
  <div class="card hyp rv"><h3>Hipótesis de investigación (H1)</h3>
   <p>La dependencia emocional influye de manera significativa en las relaciones de pareja de los jóvenes adultos.</p></div>
  <div class="card hyp h0 rv"><h3>Hipótesis nula (H0)</h3>
   <p>La dependencia emocional no influye de manera significativa en las relaciones de pareja de los jóvenes adultos.</p></div>
 </div>
 <h3 class="rv" style="margin-top:26px">Variables</h3>
 <div class="vars rv">
  <div class="card accent"><div class="gnum">Variable independiente</div><p><strong>Dependencia emocional</strong></p></div>
  <div class="arrow">→</div>
  <div class="card"><div class="gnum">Variable dependiente</div><p><strong>Relaciones de pareja en jóvenes adultos</strong></p></div>
 </div>`});

/* 7 · Objetivos */
SLIDES.push({ nav:"Objetivos", who:A, html:`
 <div class="tag rv">06 · Objetivos</div>
 <h2 class="rv">Objetivo general y <em>específicos</em></h2>
 <div class="card accent rv" style="margin-bottom:20px"><h3>Objetivo general</h3>
  <p>Analizar cómo influye la dependencia emocional en las relaciones de pareja de jóvenes adultos universitarios de Villa Canales, Guatemala.</p></div>
 <h3 class="rv">Objetivos específicos</h3>
 <ul class="clean">
  <li class="rv">Identificar las manifestaciones de dependencia emocional en la relación de pareja.</li>
  <li class="rv">Reconocer las señales de dependencia que perciben los jóvenes adultos.</li>
  <li class="rv">Determinar los factores que favorecen la dependencia emocional.</li>
  <li class="rv">Describir el impacto de la dependencia emocional en la autoestima.</li>
 </ul>`});

/* 8 · Intro resultados */
SLIDES.push({ nav:"Resultados", who:A, html:`
 <div class="tag rv">07 · Presentación y análisis de resultados</div>
 <h2 class="rv">8 indicadores, <em>31 participantes</em></h2>
 <p class="rv">Se aplicó un instrumento a <strong>31 jóvenes adultos universitarios (18–31 años)</strong>. Los resultados se organizan en tres bloques:</p>
 <div class="grid g3" style="margin-top:22px">
  <div class="card rv"><span class="num">A</span><h3>Manifestaciones</h3><p>Gráficas 1 a 5: atención, miedo a terminar, renuncias, decisiones y estado de ánimo.</p></div>
  <div class="card rv"><span class="num">B</span><h3>Señales y factores</h3><p>Gráficas 6 y 7: necesidad de aprobación y baja autoestima.</p></div>
  <div class="card rv"><span class="num">C</span><h3>Impacto</h3><p>Gráfica 8: efecto sobre la confianza personal.</p></div>
 </div>`});

/* 9-16 · Gráficas */
CHARTS.forEach((c,i)=>{
  SLIDES.push({ nav:"Gráfica "+c.n+" · "+c.title, who: i<2 ? A : K, chart:i, html:`
   <div class="tag rv">Resultados · Gráfica ${c.n} de 8</div>
   <h2 class="rv">${c.title}</h2>
   <div class="chart-wrap">
    <div class="ring rv"><canvas id="cv${i}"></canvas>
      <div class="ring-center"><div class="big" data-count="${c.main}" data-dec="${String(c.main).includes('.')?1:0}">${c.main}%</div><div class="sub">${c.mainLbl}</div></div></div>
    <div>
     <div class="bars rv" id="bars${i}"></div>
     <div class="insight rv">${c.insight}</div>
     <div class="note rv">n = ${N} · Fuente: elaboración propia con datos de la investigación. (*) Complemento hasta 100%.</div>
    </div>
   </div>`});
});

/* 17 · Conclusiones */
SLIDES.push({ nav:"Conclusiones", who:K, html:`
 <div class="tag rv">08 · Conclusiones</div>
 <h2 class="rv">Síntesis de los <em>hallazgos</em></h2>
 <div class="kpis" style="margin:0 0 22px">
  <div class="kpi rv"><div class="n" data-count="87.1" data-dec="1" data-suf="%">87.1%</div><div class="t">reduce su confianza personal</div></div>
  <div class="kpi rv"><div class="n" data-count="74.2" data-dec="1" data-suf="%">74.2%</div><div class="t">necesidad de aprobación</div></div>
  <div class="kpi rv"><div class="n" data-count="71" data-suf="%">71%</div><div class="t">necesita atención constante</div></div>
  <div class="kpi rv"><div class="n" data-count="64.5" data-dec="1" data-suf="%">64.5%</div><div class="t">identifica baja autoestima</div></div>
 </div>
 <ul class="clean">
  <li class="rv">La dependencia emocional está presente en la mayoría de los jóvenes evaluados y se manifiesta en la necesidad de atención, el miedo a la ruptura y la renuncia a actividades propias.</li>
  <li class="rv">La necesidad de aprobación y la baja autoestima aparecen como señal y factor principales.</li>
  <li class="rv">El impacto más marcado se da en la autoestima, lo que respalda la hipótesis de investigación (H1).</li>
 </ul>`});

/* 18 · Recomendaciones */
SLIDES.push({ nav:"Recomendaciones", who:K, html:`
 <div class="tag rv">09 · Recomendaciones</div>
 <h2 class="rv">Propuestas para <em>prevenir y acompañar</em></h2>
 <div class="grid g3">
  <div class="card accent rv"><span class="num">1</span><h3>Prevención</h3><p>Talleres y campañas universitarias sobre vínculos saludables, autoconocimiento y detección temprana de señales de dependencia.</p></div>
  <div class="card rv"><span class="num">2</span><h3>Orientación psicológica</h3><p>Espacios de consejería y acompañamiento para fortalecer la autoestima, la autonomía y la regulación emocional.</p></div>
  <div class="card rv"><span class="num">3</span><h3>Educación relacional</h3><p>Incorporar contenidos sobre límites personales, comunicación asertiva y relaciones de pareja en la formación universitaria.</p></div>
 </div>
 <div class="card thanks rv" style="margin-top:22px">
  <div class="big">Gracias por su atención</div>
  <p style="font-size:.9rem">Daniela Hernández · Astrid Robles · Katherine Conquera</p>
 </div>`});
