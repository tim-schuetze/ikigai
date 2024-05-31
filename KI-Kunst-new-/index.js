let currentCardIndex = 0;
let informationCards = [
  {
    headline: "Was ist KI-Kunst eigentlich?",
    information: "Im Gegensatz zu einem normalen Gemälde, bei dem ein Künstler ein Bild mit Mühe und Arbeit selber malt, zeigt KI-Kunst, dass es auch anders geht: Heutzutage ist es möglich mit Hilfe von künstlicher Intelligenz mit nur ein wenig Bildbeschreibung innerhalb von weniger Sekunden ein Kunstwerk zu erschaffen."
  },
  {
    headline: "Wie wird KI-Kunst erschaffen?",
    information: "Derzeit existieren spezielle Programme, die es ermöglichen, mithilfe von KI Kunstwerke zu erschaffen. Die bekanntesten Tools zur Erstellung sind Stable Diffusion und Midjouney. Nach Eingabe der Beschreibung generiert das Programm eine Vielzahl von möglichen Bildern."
  },
  {
    headline: "Wie kann KI in kreativen Schaffungsprozessen helfen?",
    information: "KI kann Künstlern helfen Inspiration zu finden oder bspw. bei Skizzen Vorarbeit zu leisten. Bei der Musik Produktion wird KI zur Automatischen Erstellung von Stimm-Samples genutzt. Es dient also als erweitertes Gedächtnis, das mithilfe von Mustererkennung die besten Ergebnisse aus den Datengrundlagen generiert und somit als erweiterter Arm für die Künstler fungiert."
  },
  {
    headline: "Wer ist der Urheber bei KI generierter Kunst?",
    information: "Wer auf jeden Fall nicht der Urheber der Kunst ist, ist die KI an sich, denn diese ist auf ihre Daten beschränkt und kann von sich aus nicht kreativ agieren. Rechtlich betrachtet ist der Programmierer also der Schaffer des Schaffenden der Besitzer dieses Geistigen gutes und nicht derjenige der, der KI die Anregung zu diesem gibt."
  }
];

let currentAiText = [
  {
    headline: "ChatGPT",
    information: `ChatGPT ist ein fortschrittliches künstliches neuronales Netzwerk, das auf der GPT-3.5-Architektur von OpenAI basiert. Es wurde entwickelt, um menschenähnliche Konversationen zu führen und komplexe sprachliche Aufgaben zu bewältigen. GPT steht für "Generative Pre-trained Transformer", was bedeutet, dass das Modell auf einer großen Menge an Textdaten vortrainiert wurde, um ein tiefes Verständnis für natürliche Sprache zu entwickeln. ChatGPT kann in verschiedenen Anwendungsbereichen eingesetzt werden, darunter Kundensupport, Textgenerierung, Informationssuche, Programmierung, Sprachübersetzung und vieles mehr. Es kann Fragen beantworten, Probleme lösen, Ratschläge geben und sogar Geschichten erzählen, alles auf eine Art und Weise, die einer menschlichen Unterhaltung ähnelt. Das Modell lernt aus seiner Interaktion mit den Benutzern und kann kontinuierlich verbessert werden. Es ist darauf ausgelegt, sich an den individuellen Schreibstil und die Bedürfnisse der Benutzer anzupassen. Dabei ist es jedoch wichtig zu beachten, dass ChatGPT trotz seiner Leistungsfähigkeit auch Einschränkungen hat und gelegentlich falsche oder unangemessene Antworten geben kann. OpenAI setzt sich aktiv dafür ein, die Sicherheit und Zuverlässigkeit von ChatGPT zu verbessern, um potenzielle Missbrauchsmöglichkeiten zu reduzieren und die Verwendung für positive Zwecke zu fördern. Benutzer werden ermutigt, verantwortungsbewusst mit dem Modell umzugehen und seine Ergebnisse kritisch zu bewerten, um eine bestmögliche Nutzung zu gewährleisten.`
  },
  {
    headline: "Midjourney",
    information: `Midjourney ist ein innovatives Unternehmen, das im Jahr 2015 gegründet wurde und seinen Sitz in einem aufstrebenden Technologiezentrum hat. Das Unternehmen hat sich darauf spezialisiert, kreative und maßgeschneiderte Lösungen im Bereich der digitalen Transformation anzubieten.

    Mit einem hochqualifizierten Team aus Experten in den Bereichen Künstliche Intelligenz, maschinelles Lernen, Data Science und Softwareentwicklung hat Midjourney eine breite Palette von Dienstleistungen entwickelt, die es Unternehmen ermöglichen, ihre Geschäftsprozesse zu optimieren und ihre Wettbewerbsfähigkeit zu steigern.
    
    Das Leistungsspektrum von Midjourney umfasst unter anderem die Entwicklung intelligenter Chatbots und virtueller Assistenten, die Kundenkommunikation verbessern und den Kundensupport optimieren. Zudem bietet das Unternehmen datengetriebene Lösungen für die Geschäftsanalyse und -prognose, um fundierte Entscheidungen zu treffen und wertvolle Einblicke in das Unternehmen zu gewinnen.
    
    Midjourney hat sich auch einen Namen in der Entwicklung von maßgeschneiderten Softwarelösungen gemacht, die speziell auf die individuellen Anforderungen und Bedürfnisse der Kunden zugeschnitten sind. Dabei setzen sie modernste Technologien ein, um innovative und benutzerfreundliche Anwendungen zu schaffen.
    
    Ein weiterer Schwerpunkt von Midjourney liegt auf der Umsetzung von Projekten im Bereich der künstlichen Intelligenz und des maschinellen Lernens. Sie arbeiten an Forschungsprojekten und kooperieren mit akademischen Einrichtungen, um an der Spitze der Technologieentwicklung zu bleiben und ihren Kunden stets die neuesten Lösungen bieten zu können.
    
    Das Unternehmen legt großen Wert auf Nachhaltigkeit und soziale Verantwortung und setzt sich dafür ein, Technologien zu entwickeln, die einen positiven Einfluss auf die Gesellschaft und die Umwelt haben. Dabei stehen ethische Grundsätze und Datenschutz an oberster Stelle.
    
    Midjourney hat sich als vertrauenswürdiger Partner für Unternehmen aller Größen und Branchen etabliert und strebt danach, durch innovative Technologielösungen die Geschäftswelt zu transformieren und eine bessere Zukunft zu gestalten.`
  }
]

document.getElementById("informationCardHeadline").textContent = informationCards[currentCardIndex].headline;
document.getElementById("informationCardInformation").textContent = informationCards[currentCardIndex].information;
document.getElementById("switchCardNumberButton1").style.backgroundColor = "rgb(64, 64, 64)";
document.getElementById("previousCardButton").hidden = true;

document.getElementById("previousCardButton").onclick = () => {
  currentCardIndex--;
  checkCurrentCard();
}

document.getElementById("nextCardButton").onclick = () => {
  currentCardIndex++;
  checkCurrentCard();
}


document.getElementById("switchCardNumberButton1").onclick = () => {
  currentCardIndex = 0;
  checkCurrentCard();
}
document.getElementById("switchCardNumberButton2").onclick = () => {
  currentCardIndex = 1;
  checkCurrentCard();
}
document.getElementById("switchCardNumberButton3").onclick = () => {
  currentCardIndex = 2;
  checkCurrentCard();
}
document.getElementById("switchCardNumberButton4").onclick = () => {
  currentCardIndex = 3;
  checkCurrentCard();
}

function checkCurrentCard(){
  if(currentCardIndex == 0){
    document.getElementById("previousCardButton").hidden = true;
    document.getElementById("switchCardNumberButton1").style.backgroundColor = "rgb(64, 64, 64)";
    document.getElementById("switchCardNumberButton2").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton3").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton4").style.backgroundColor = "rgb(46, 46, 46)";
  }
  else{
    document.getElementById("previousCardButton").hidden = false;
  }
  if(currentCardIndex == 1){
    document.getElementById("switchCardNumberButton1").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton2").style.backgroundColor = "rgb(64, 64, 64)";
    document.getElementById("switchCardNumberButton3").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton4").style.backgroundColor = "rgb(46, 46, 46)";
  }
  if(currentCardIndex == 2){
    document.getElementById("switchCardNumberButton1").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton2").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton3").style.backgroundColor = "rgb(64, 64, 64)";
    document.getElementById("switchCardNumberButton4").style.backgroundColor = "rgb(46, 46, 46)";
  }
  if(currentCardIndex == 3){
    document.getElementById("nextCardButton").hidden = true;
    document.getElementById("switchCardNumberButton1").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton2").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton3").style.backgroundColor = "rgb(46, 46, 46)";
    document.getElementById("switchCardNumberButton4").style.backgroundColor = "rgb(64, 64, 64)";
  }
  else{
    document.getElementById("nextCardButton").hidden = false;
  }
  document.getElementById("informationCardHeadline").textContent = informationCards[currentCardIndex].headline;
document.getElementById("informationCardInformation").textContent = informationCards[currentCardIndex].information;
}

function showMoreImages(){
  document.getElementById("showMore").hidden = true;
  for(let i = 7; i <= 15; i++){
    document.getElementById("pic" + i).hidden = false;
  }
}

document.getElementById("midjourneyLogo").style.opacity = "0.3";

document.getElementById("chatgptLogo").onclick = function displayChatgptInformation(){
  if(document.getElementById("aiInformationTextHeadline").textContent !== currentAiText[0].headline){
    document.getElementById("aiInformationTextHeadline").textContent = currentAiText[0].headline;
    document.getElementById("aiInformationText").textContent = currentAiText[0].information;
  }

  document.getElementById("midjourneyLogo").style.opacity = "0.3";
  document.getElementById("chatgptLogo").style.opacity = "1";
}

document.getElementById("midjourneyLogo").onclick = function displayMidjourneyInformation(){
  if(document.getElementById("aiInformationTextHeadline").textContent !== currentAiText[1].headline){
    document.getElementById("aiInformationTextHeadline").textContent = currentAiText[1].headline;
    document.getElementById("aiInformationText").textContent = currentAiText[1].information;
  }

  document.getElementById("chatgptLogo").style.opacity = "0.3";
  document.getElementById("midjourneyLogo").style.opacity = "1";
}

document.getElementById("aiInformationTextHeadline").onclick = () => {
  if(document.getElementById("aiInformationTextHeadline").textContent == "ChatGPT"){
    window.open("https://de.wikipedia.org/wiki/ChatGPT");
  }
  else{
    window.open("https://de.wikipedia.org/wiki/Midjourney");
  }
}

document.getElementById("switchCardNumberButton1").onmouseover = () => {

}

document.getElementById("colorDefault").style.border = "2px solid white";