/* Funcion para sustituir el contenido del modal generico del portal_normal, ejemplo de llamada:
*  <button type="button" class="lda-btn lda-btn--primary" data-toggle="modal" data-target="#ldaModal">Abrir</button>
* title: texto plano para la cabecera del modal.
* body: recibe codigo html para el cuerpo del modal.
* button: texto plano para el boton principal.
* link: href para el boton principal.
* buttonClose: OPCIONAL. texto plano para el boton de cierre del modal. Si no se incluye en la llamada a la funcion,
* no aparecer� el boton.
*/
function set_modal(title, body, button, link, buttonClose) {
	createModal();

	$('#ldaModal').css('visibility', 'hidden');
	$("#ldaModalTitle").empty().text(title);
	$("#ldaModalBody").empty().html(body);
	$("#ldaModalButton").empty().text(button).attr("onclick", link);
	if (buttonClose) {
		$("#ldaModalButtonClose").removeClass("d-none").empty().text(buttonClose);
	} else {
		$("#ldaModalButtonClose").addClass("d-none");
	}
	$('#ldaModal').css('visibility', 'visible');
	$('#ldaModalButton').css('visibility', 'visible').css('display','flex');
}

/* Funcion para sustituir el contenido del modal generico del portal_normal, ejemplo de llamada:
*  <button type="button" class="lda-btn lda-btn--primary" data-toggle="modal" data-target="#ldaModal">Abrir</button>
* title: texto plano para la cabecera del modal.
* body: recibe codigo html para el cuerpo del modal.
* button: texto plano para el boton principal.
* link: href para el boton principal.
* img: imagen de la bottom bar que se pasa al modal
* altImg: alt de la imagen que se muestra en el modal
* labelImg: label de la imagen que se muestra en el modal
* phoneNumberText: el n�mero de telefono que servir� de texto para el elemento <a>
* phoneNumberLink: el n�mero de telefono que se agregar� al href del elemento <a> (tel:+34${phoneNumberLink})
* phoneSectionText: el texto que sale antes del link del telefono
* buttonClose: OPCIONAL. texto plano para el boton de cierre del modal. Si no se incluye en la llamada a la funcion,
* no aparecer� el boton.
*/
function set_modal_bottom_bar(cotizadores, phoneNumberText, phoneNumberLink, numCotizadores, title, body, etiquetadoTitulo, etiquetadoSubtitulo, button, buttonClose) {
	createModalBottomBar(numCotizadores);

	$('#ldaModalBottomBar').css('visibility', 'hidden');
	if (title === ""){
		$('#ldaModalTitleBottomBar').remove();
	}
	else{
		$('#ldaModalTitleBottomBar').replaceWith($('<'+ etiquetadoTitulo +' id="ldaModalTitleBottomBar" class="high-4 text-center" >' + '</' + etiquetadoTitulo + '>'));
		$('#ldaModalTitleBottomBar').empty().text(title);
	}

	if (body === ""){
		$('#ldaModalBodyBottomBar').remove();
	}
	else{
		$('#ldaModalBodyBottomBar').replaceWith($('<'+ etiquetadoSubtitulo +' id="ldaModalBodyBottomBar" class="text-center">' + '</' + etiquetadoSubtitulo + '>'));
		$('#ldaModalBodyBottomBar').empty().html(body);
	}

	var listaCotizadores = [];
	for (var j = 1; j <= numCotizadores; j++) {
		listaCotizadores.push({img: getSubstringValue(cotizadores,"imagen", j), altImg: getSubstringValue(cotizadores, "altImagen", j), ariaImg: getSubstringValue(cotizadores, "ariaImagen", j), imgHover: getSubstringValue(cotizadores, "imagenHover", j), altImgHover: getSubstringValue(cotizadores, "altImagenHover", j), ariaImgHover: getSubstringValue(cotizadores, "ariaImagenHover", j), tipoSeguro: getSubstringValue(cotizadores, "tipoSeguro", j), paginaEnlace: getSubstringValue(cotizadores, "paginaEnlace", j), ordenCotizador: getSubstringValue(cotizadores, "ordenCotizador", j), iconoExtra: getSubstringValue(cotizadores, "iconoExtra", j), altIconoExtra: getSubstringValue(cotizadores, "altIconoExtra", j), ariaIconoExtra: getSubstringValue(cotizadores, "ariaIconoExtra", j), textoPrecio: getSubstringValue(cotizadores, "textoPrecio", j), etiquetadoNombreSeguroBottom: getSubstringValue(cotizadores, "etiquetadoNombreSeguroBottom", j)});
	}
	listaCotizadores.sort(({ordenCotizador:a}, {ordenCotizador:b}) => a-b);
	for (var i = 1; i <= numCotizadores; i++) {
		var imgCotizador = listaCotizadores[i-1].img;
		var altImgCotizador = listaCotizadores[i-1].altImg;
		var ariaImgCotizador = listaCotizadores[i-1].ariaImg;
		var imgHoverCotizador = listaCotizadores[i-1].imgHover;
		var altImgHoverCotizador = listaCotizadores[i-1].altImgHover;
		var ariaImgHoverCotizador = listaCotizadores[i-1].ariaImgHover;
		var tipoSeguroCotizador = listaCotizadores[i-1].tipoSeguro;
		var paginaEnlaceCotizador = listaCotizadores[i-1].paginaEnlace;
		var iconoExtraCotizador = listaCotizadores[i-1].iconoExtra;
		var altIconoExtraCotizador = listaCotizadores[i-1].altIconoExtra;
		var ariaIconoExtraCotizador = listaCotizadores[i-1].ariaIconoExtra;
		var textoPrecioCotizador = listaCotizadores[i-1].textoPrecio;
		var etiquetadoNombreSeguroBottom = listaCotizadores[i-1].etiquetadoNombreSeguroBottom;
		if (tipoSeguroCotizador.includes("Profesional")){
			if (/^\d+$/.test(paginaEnlaceCotizador)) {
				$('#ldaModalLinkBottomBar' + i).prop('href', 'javascript:').prop('title', tipoSeguroCotizador).attr('data-target', '#ldaModalDefault' + paginaEnlaceCotizador).attr('data-toggle', 'modal').attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventAnalitica('Bottom_bar_pop_up','Calcular_precio_empresas', analiticaGetPageName(), 'calcular_precio_empresas'); openModalDefault" + paginaEnlaceCotizador + "();");
			} else {
				$('#ldaModalLinkBottomBar' + i).prop('href', paginaEnlaceCotizador).prop('title', tipoSeguroCotizador).attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventAnalitica('Bottom_bar_pop_up','Calcular_precio_empresas', analiticaGetPageName(), 'calcular_precio_empresas')");
			}
		} else if (tipoSeguroCotizador.includes("Ocupaci")) {
			if (/^\d+$/.test(paginaEnlaceCotizador)) {
				$('#ldaModalLinkBottomBar' + i).prop('href', 'javascript:').prop('title', tipoSeguroCotizador).attr('data-target', '#ldaModalDefault' + paginaEnlaceCotizador).attr('data-toggle', 'modal').attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventAnalitica('Bottom_bar_pop_up','Calcular_precio_ocupacion', analiticaGetPageName(), 'calcular_precio_ocupacion'); openModalDefault" + paginaEnlaceCotizador + "();");
			} else {
				$('#ldaModalLinkBottomBar' + i).prop('href', paginaEnlaceCotizador).prop('title', tipoSeguroCotizador).attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventAnalitica('Bottom_bar_pop_up','Calcular_precio_ocupacion', analiticaGetPageName(), 'calcular_precio_ocupacion')");
			}
		} else {
			if (/^\d+$/.test(paginaEnlaceCotizador)) {
				$('#ldaModalLinkBottomBar' + i).prop('href', 'javascript:').prop('title', tipoSeguroCotizador).attr('data-target', '#ldaModalDefault' + paginaEnlaceCotizador).attr('data-toggle', 'modal').attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventAnalitica('Bottom_bar_pop_up','Calcular_precio_" + tipoSeguroCotizador.toLowerCase() + "'" + ", analiticaGetPageName(), 'calcular_precio_" + tipoSeguroCotizador.toLowerCase() + "'" + "); openModalDefault" + paginaEnlaceCotizador + "();");
			} else {
				$('#ldaModalLinkBottomBar' + i).prop('href', paginaEnlaceCotizador).prop('title', tipoSeguroCotizador).attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventAnalitica('Bottom_bar_pop_up','Calcular_precio_" + tipoSeguroCotizador.toLowerCase() + "'" + ", analiticaGetPageName(), 'calcular_precio_" + tipoSeguroCotizador.toLowerCase() + "'" + ")");
			}
		}
		if (iconoExtraCotizador === "null"){
			$('#ldaModalIconoExtraBottomBar' + i).remove();
		} else {
			$('#ldaModalIconoExtraBottomBar' + i).empty().prop('src', iconoExtraCotizador).prop('alt', altIconoExtraCotizador).attr('aria-hidden', ariaIconoExtraCotizador);
		}
		$('#ldaModalImageBottomBar' + i).empty().prop('src', imgCotizador).prop('alt', altImgCotizador).attr('aria-hidden', ariaImgCotizador);
		$('#ldaModalImageHoverBottomBar' + i).empty().prop('src', imgHoverCotizador).prop('alt', altImgHoverCotizador).attr('aria-hidden', ariaImgHoverCotizador);
		$('#ldaModalImageLabelBottomBar' + i).replaceWith($('<'+ etiquetadoNombreSeguroBottom +' id="ldaModalImageLabelBottomBar' + i + '" class="low-4 mb-1 mt-1">' + '</' + etiquetadoNombreSeguroBottom + '>'));
		$('#ldaModalImageLabelBottomBar' + i).empty().text(tipoSeguroCotizador);
		if (textoPrecioCotizador === "null"){
			$('#ldaModalTextoPrecioBottomBar' + i).remove();
		} else {
			$('#ldaModalTextoPrecioBottomBar' + i).empty().text(textoPrecioCotizador);
		}
	}
	if (phoneNumberText === ''){
		$('#ldaModalTelephoneNumberBottomBar').remove();
	} else {
		$('#ldaModalTelephoneNumberBottomBar').empty().text(phoneNumberText).prop('href', phoneNumberLink);
	}
	if (buttonClose) {
		$('#ldaModalButtonCloseBottomBar').removeClass('d-none').empty().text(buttonClose);
	} else {
		$('#ldaModalButtonCloseBottomBar').addClass('d-none');
	}

	$('#ldaModalBottomBar').css('visibility', 'visible');
	$('#ldaModalButtonBottomBar').css('visibility', 'visible').css('display','flex');
}


function set_modal_cards_home(cotizadores, phoneNumberText, phoneNumberLink, numCotizadores, title, body, etiquetadoTitulo, etiquetadoSubtitulo, button, buttonClose) {
	createModalCards(numCotizadores);

	$('#ldaModalCards').css('visibility', 'hidden');
	if (title === ""){
		$('#ldaModalTitleCards').remove();
	}
	else{
		$('#ldaModalTitleCards').replaceWith($('<'+ etiquetadoTitulo +' id="ldaModalTitleCards" class="high-4 text-center" >' + '</' + etiquetadoTitulo + '>'));
		$('#ldaModalTitleCards').empty().text(title);
	}

	if (body === ""){
		$('#ldaModalBodyCards').remove();
	}
	else{
		$('#ldaModalBodyCards').replaceWith($('<'+ etiquetadoSubtitulo +' id="ldaModalBodyCards" class="text-center">' + '</' + etiquetadoSubtitulo + '>'));
		$('#ldaModalBodyCards').empty().html(body);
	}

	var listaCotizadores = [];
	for (var j = 1; j <= numCotizadores; j++) {
		listaCotizadores.push({img: getSubstringValue(cotizadores,"imagen", j), altImg: getSubstringValue(cotizadores, "altImagen", j), ariaImg: getSubstringValue(cotizadores, "ariaImagen", j), imgHover: getSubstringValue(cotizadores, "imagenHover", j), altImgHover: getSubstringValue(cotizadores, "altImagenHover", j), ariaImgHover: getSubstringValue(cotizadores, "ariaImagenHover", j), tipoSeguro: getSubstringValue(cotizadores, "tipoSeguro", j), paginaEnlace: getSubstringValue(cotizadores, "paginaEnlace", j), ordenCotizador: getSubstringValue(cotizadores, "ordenCotizador", j), iconoExtra: getSubstringValue(cotizadores, "iconoExtra", j), altIconoExtra: getSubstringValue(cotizadores, "altIconoExtra", j), ariaIconoExtra: getSubstringValue(cotizadores, "ariaIconoExtra", j), textoPrecio: getSubstringValue(cotizadores, "textoPrecio", j), campoInfo: getSubstringValue(cotizadores, "analiticaInfo", j), campoLabel: getSubstringValue(cotizadores, "analiticaLabel", j), campoAction: getSubstringValue(cotizadores, "analiticaAction", j), etiquetadoNombreSeguro: getSubstringValue(cotizadores, "etiquetadoNombreSeguro", j)});
	}
	listaCotizadores.sort(({ordenCotizador:a}, {ordenCotizador:b}) => a-b);
	for (var i = 1; i <= numCotizadores; i++) {
		var imgCotizador = listaCotizadores[i-1].img;
		var altImgCotizador = listaCotizadores[i-1].altImg;
		var ariaImgCotizador = listaCotizadores[i-1].ariaImg;
		var imgHoverCotizador = listaCotizadores[i-1].imgHover;
		var altImgHoverCotizador = listaCotizadores[i-1].altImgHover;
		var ariaImgHoverCotizador = listaCotizadores[i-1].ariaImgHover;
		var tipoSeguroCotizador = listaCotizadores[i-1].tipoSeguro;
		var paginaEnlaceCotizador = listaCotizadores[i-1].paginaEnlace;
		var iconoExtraCotizador = listaCotizadores[i-1].iconoExtra;
		var altIconoExtraCotizador = listaCotizadores[i-1].altIconoExtra;
		var ariaIconoExtraCotizador = listaCotizadores[i-1].ariaIconoExtra;
		var textoPrecioCotizador = listaCotizadores[i-1].textoPrecio;
		var campoInfo = listaCotizadores[i-1].campoInfo;
		var campoLabel = listaCotizadores[i-1].campoLabel;
		var campoAction = listaCotizadores[i-1].campoAction;
		var etiquetadoNombreSeguro = listaCotizadores[i-1].etiquetadoNombreSeguro;
		$('#ldaModalLinkCards' + i).prop('href', paginaEnlaceCotizador).prop('title', tipoSeguroCotizador).attr('onclick', "$('#ldaModalBottomBar').modal('hide'); sendEventDesdeFragmento('" + campoInfo + "','" + campoLabel + "','" + campoAction + "')");
		if (iconoExtraCotizador === "null"){
			$('#ldaModalIconoExtraCards' + i).remove();
		} else {
			$('#ldaModalIconoExtraCards' + i).empty().prop('src', iconoExtraCotizador).prop('alt', altIconoExtraCotizador).attr('aria-hidden', ariaIconoExtraCotizador);
		}
		$('#ldaModalImageCards' + i).empty().prop('src', imgCotizador).prop('alt', altImgCotizador).attr('aria-hidden', ariaImgCotizador);
		$('#ldaModalImageHoverCards' + i).empty().prop('src', imgHoverCotizador).prop('alt', altImgHoverCotizador).attr('aria-hidden', ariaImgHoverCotizador);
		$('#ldaModalImageLabelCards' + i).replaceWith($('<'+ etiquetadoNombreSeguro +' id="ldaModalImageLabelCards' + i + '" class="low-4 mb-1 mt-1">' + '</' + etiquetadoNombreSeguro + '>'));
		$('#ldaModalImageLabelCards' + i).empty().text(tipoSeguroCotizador);
		if (textoPrecioCotizador === "null"){
			$('#ldaModalTextoPrecioCards' + i).remove();
		} else {
			$('#ldaModalTextoPrecioCards' + i).empty().text(textoPrecioCotizador);
		}
	}
	if (phoneNumberText === ''){
		$('#ldaModalTelephoneNumberCards').remove();
	} else {
		$('#ldaModalTelephoneNumberCards').empty().text(phoneNumberText).prop('href', phoneNumberLink);
	}
	if (buttonClose) {
		$('#ldaModalButtonCloseCards').removeClass('d-none').empty().text(buttonClose);
	} else {
		$('#ldaModalButtonCloseCards').addClass('d-none');
	}

	$('#ldaModalCards').css('visibility', 'visible');
	$('#ldaModalButtonCards').css('visibility', 'visible').css('display','flex');
}

function hide_modal(elemSelector){
	let elem = document.querySelector(elemSelector);
    elem.removeAttribute("data-ref-id");
	$('#ldaModal').modal('hide');


	let containerParent = $(elem).closest(".lda-hero-media-right__content");
	containerParent.find("#nameInput").focus();
}

//A�adir llamada al modal desde el boton interno
function set_onclick_modal(elem) {
	createModal()

	$('#ldaModalButton').attr({"onClick": "hide_modal('[data-ref-id=\"" + elem.id + "\"]')"}).removeAttr('data-dismiss');
}

function createModal() {
	// Create the modal elements
	var modal = document.createElement('div');
	modal.classList.add('lda-modal', 'modal', 'fade');
	modal.id = 'ldaModal';
	modal.tabIndex = '-1';
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-labelledby', 'ldaModalTitle');
	modal.setAttribute('aria-hidden', 'true');

	var modalDialog = document.createElement('div');
	modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
	modalDialog.role = 'document';

	var modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');
	modalContent.id = 'ldaModalContent';

	var closeLabel = 'Cerrar';
	if (window.location.pathname.startsWith(window.urlEnglish)){
		closeLabel = 'Close';
	} else if (window.location.pathname.startsWith(window.urlGerman)) {
		closeLabel = 'Schließen';
	} else if (window.location.pathname.startsWith(window.urlCatalan)){
		closeLabel = 'Tancar';
	}
	var images_folder = Liferay.ThemeDisplay.getPathThemeImages();

	// Set the modal HTML content
	var modalHTML = `
    <div class="lda-modal-header d-flex flex-row justify-content-between">
      <div class="h3 lda-modal-title" id="ldaModalTitle"></div>
      <button type="button" class="close" data-dismiss="modal" aria-label="${closeLabel}">
        <span aria-hidden="true">
          <img src="${images_folder}/close.svg" alt="${closeLabel}"/>
        </span>
      </button>
    </div>
    <div class="lda-modal-body" id="ldaModalBody"></div>
    <div class="lda-modal-footer d-flex flex-column">
      <button id="ldaModalButton" type="button" class="lda-btn lda-btn--primary lda-btn-modal" data-dismiss="modal"></button>
      <button id="ldaModalButtonClose" type="button" class="lda-btn lda-btn--primary lda-btn-modal" data-dismiss="modal"></button>
    </div>
  `;

	modalContent.innerHTML = modalHTML;
	modalDialog.appendChild(modalContent);
	modal.appendChild(modalDialog);

	if (!getElementByIdIfExists("ldaModal")) {
		// Append the modal to the document body
		document.body.appendChild(modal);

		// Add an event listener to remove the modal when it is closed
		$(modal).on('hidden.bs.modal', function () {
			// Remove the modal from the DOM
			$(modal).remove();
		});

		$(modal).modal('show');
	}
}

function createModalBottomBar(numCotizadores) {
	var modal = document.createElement('div');
	modal.classList.add('lda-modal', 'modal', 'fade');
	modal.id = 'ldaModalBottomBar';
	modal.tabIndex = '-1';
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-labelledby', 'ldaModalTitleBottomBar');
	modal.setAttribute('aria-hidden', 'true');
	let volverKey = 'Volver';
	let titleTelefono = 'Llama\x20por\x20teléfono';
	if (window.location.pathname.startsWith(window.urlEnglish)){
		volverKey = 'Back';
		titleTelefono = 'Call\x20on\x20the\x20phone';
	} else if (window.location.pathname.startsWith(window.urlGerman)) {
		volverKey = 'Zurück';
		titleTelefono = 'Rufen\x20Sie\x20per\x20Telefon\x20an';
	} else if (window.location.pathname.startsWith(window.urlCatalan)){
		volverKey = 'Tornar';
		titleTelefono = 'Truca\x20per\x20telèfon';
	}

	// Set the modal HTML content
	var modalHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="lda-modal-header d-flex flex-row justify-content-between align-items-center">
          <button type="button" class="close lda-modal-bottom-bar-close lda-btn lda-btn--action-button lda-btn lda-btn--action-button-icon" data-dismiss="modal" aria-label="${volverKey}" onclick="sendEventAnalitica('Bottom_bar_pop_up','volver', analiticaGetPageName(), 'volver')">
            <span aria-hidden="true" class="d-flex align-items-center ">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 6L9 12L15 18" stroke="#1A1A1A" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				${volverKey}
			</span>
		  </button>
		  
		  <a class="lda-tel__primary lda-btn lda-btn--action-button lda-btn lda-btn--action-button-icon" title="${titleTelefono}" id="ldaModalTelephoneNumberBottomBar" href="" onclick="sendEventAnalitica('Bottom_bar_pop_up','Telefono', analiticaGetPageName(), 'telefono_texto')"></a>
        </div>
        <div class="lda-modal-body">
         <div id="ldaModalTitleBottomBar" class="high-4 text-center" ></div>
          <p id="ldaModalBodyBottomBar" class="text-center"></p> 
         <div class="lda-row-cotizadores d-flex justify-content-center align-items-center flex-wrap">
    `;
	for (var i = 1; i <= numCotizadores; i++) {
		modalHTML += `
		  <a title="" id="ldaModalLinkBottomBar${i}" class="lda-card-cotizador d-flex flex-column justify-content-center align-items-center" href="" onclick="">
			<img width="58" height="22" id="ldaModalIconoExtraBottomBar${i}" src="" alt="" aria-hidden="" class="lda-icono-extra mb-1">
			<img id="ldaModalImageBottomBar${i}" src="" alt="" aria-hidden="" width="48" height="48">
			<img class="lda-img-cotizador-hover" id="ldaModalImageHoverBottomBar${i}" src="" alt="" aria-hidden="" width="48" height="48">
			<p id="ldaModalImageLabelBottomBar${i}" class="low-4 mb-1 mt-1"></p>
			<span id="ldaModalTextoPrecioBottomBar${i}" class="color-primary-red low-2"></span>
		  </a>
     `;
	}

	modalHTML += `
			 </div>
        </div>
        <div class="lda-modal-footer d-flex flex-column">
          <button id="ldaModalButtonCloseBottomBar" type="button" class="lda-btn lda-btn--primary lda-btn-modal" data-dismiss="modal"></button>
        </div>
      </div>
    </div>`;

	modal.innerHTML = modalHTML;

	// Append the modal to the document body
	document.body.appendChild(modal);

	//Assign active class to first element
	document.getElementById("ldaModalLinkBottomBar1").classList.add("active");

	// Add an event listener to remove the modal when it is closed
	$(modal).on('hidden.bs.modal', function () {
		// Remove the modal from the DOM
		$(modal).remove();
	});
}


function createModalCards(numCotizadores) {
	var modal = document.createElement('div');
	modal.classList.add('lda-modal', 'modal', 'fade');
	modal.id = 'ldaModalCards';
	modal.tabIndex = '-1';
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-labelledby', 'ldaModalTitleCards');
	modal.setAttribute('aria-hidden', 'true');
	let volverKey = 'Volver';
	let titleTelefono = 'Llama\x20por\x20teléfono';
	if (window.location.pathname.startsWith(window.urlEnglish)){
		volverKey = 'Back';
		titleTelefono = 'Call\x20on\x20the\x20phone';
	} else if (window.location.pathname.startsWith(window.urlGerman)) {
		volverKey = 'Zurück';
		titleTelefono = 'Rufen\x20Sie\x20per\x20Telefon\x20an';
	} else if (window.location.pathname.startsWith(window.urlCatalan)){
		volverKey = 'Tornar';
		titleTelefono = 'Truca\x20per\x20telèfon';
	}

	// Set the modal HTML content
	var modalHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="lda-modal-header d-flex flex-row justify-content-between align-items-center">
          <button type="button" class="close lda-modal-bottom-bar-close lda-btn lda-btn--action-button lda-btn lda-btn--action-button-icon" data-dismiss="modal" aria-label="${volverKey}" onclick="sendEventAnalitica('Bottom_bar_pop_up','volver', analiticaGetPageName(), 'volver')">
            <span aria-hidden="true" class="d-flex align-items-center ">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 6L9 12L15 18" stroke="#1A1A1A" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				${volverKey}
			</span>
		  </button>
		  
		  <a class="lda-tel__primary lda-btn lda-btn--action-button lda-btn lda-btn--action-button-icon" title="${titleTelefono}" id="ldaModalTelephoneNumberCards" href="" onclick="sendEventAnalitica('Bottom_bar_pop_up','Telefono', analiticaGetPageName(), 'telefono_texto')"></a>
        </div>
        <div class="lda-modal-body">
         <div id="ldaModalTitleCards" class="high-4 text-center" ></div>
          <p id="ldaModalBodyCards" class="text-center"></p> 
         <div class="lda-row-cotizadores d-flex justify-content-center align-items-center flex-wrap">
    `;
	for (var i = 1; i <= numCotizadores; i++) {
		modalHTML += `
		  <a title="" id="ldaModalLinkCards${i}" class="lda-card-cotizador d-flex flex-column justify-content-center align-items-center" href="" onclick="">
			<img width="58" height="22" id="ldaModalIconoExtraCards${i}" src="" alt="" aria-hidden="" class="lda-icono-extra mb-1">
			<img id="ldaModalImageCards${i}" src="" alt="" aria-hidden="" width="48" height="48">
			<img class="lda-img-cotizador-hover" id="ldaModalImageHoverCards${i}" src="" alt="" aria-hidden="" width="48" height="48">
			<p id="ldaModalImageLabelCards${i}" class="low-4 mb-1 mt-1"></p>
			<span id="ldaModalTextoPrecioCards${i}" class="color-primary-red low-2"></span>
		  </a>
     `;
	}

	modalHTML += `
			 </div>
        </div>
        <div class="lda-modal-footer d-flex flex-column">
          <button id="ldaModalButtonCloseCards" type="button" class="lda-btn lda-btn--primary lda-btn-modal" data-dismiss="modal"></button>
        </div>
      </div>
    </div>`;

	modal.innerHTML = modalHTML;

	// Append the modal to the document body
	document.body.appendChild(modal);

	//Assign active class to first element
	document.getElementById("ldaModalLinkCards1").classList.add("active");

	// Add an event listener to remove the modal when it is closed
	$(modal).on('hidden.bs.modal', function () {
		// Remove the modal from the DOM
		$(modal).remove();
	});
}

function createModalQuejas() {
	// Get the container element
	var contenedorOculto = document.querySelector('.contenedor-modal-quejas');

	// Create the modal elements
	var modal = document.createElement('div');
	modal.classList.add('lda-modal', 'modal', 'fade');
	modal.id = 'ldaModalQuejas';
	modal.tabIndex = '-1';
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-labelledby', 'ldaModalQuejasTitle');
	modal.setAttribute('aria-hidden', 'true');

	var modalDialog = document.createElement('div');
	modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
	modalDialog.role = 'document';

	var modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');
	modalContent.id = 'ldaModalQuejasContent';

	var images_folder = Liferay.ThemeDisplay.getPathThemeImages();

	var modalQuejasTitle = '\xbfEstás\x20seguro\x20de\x20que\x20deseas\x20presentar\x20una\x20queja\x3f';
	var modalQuejasBody = 'Quizás\x20podamos\x20atender\x20tu\x20incidencia\x20a\x20través\x20de\x3a';
	var modalQuejasButton = 'Contactar\x20con\x20un\x20supervisor';
	var closeLabel = 'Cerrar';
	var modalQuejasHrefBoton = "/clientes/quejasaltas.init.faces?idAplicacion=37A-103A-18A49A80A-42A15A-16A&id=ES";
	if (window.location.pathname.startsWith('/web/vivaz-colectivos') || window.location.hostname.includes("salud")) {
		modalQuejasHrefBoton = "https://www.vivaz.com/clientes/quejasaltas.init.faces?idAplicacion=37A-103A-18A49A80A-42A15A-16A&id=ES";
	}
	if (window.location.pathname.startsWith(window.urlEnglish)){
		modalQuejasTitle = 'Are\x20you\x20sure\x20you\x20want\x20to\x20lodge\x20a\x20complaint\x3f';
		modalQuejasBody = 'We\x20may\x20be\x20able\x20to\x20address\x20your\x20incident\x20by\x20means\x20of\x3a';
		modalQuejasButton = 'Contacting\x20a\x20supervisor';
		closeLabel = 'Close';
		modalQuejasHrefBoton = "/clientes/quejasaltas.init.faces?idAplicacion=37A-103A-18A49A80A-42A15A-16A&id=EN";
	} else if (window.location.pathname.startsWith(window.urlGerman)) {
		modalQuejasTitle = 'Sind\x20Sie\x20sicher\x2c\x20dass\x20Sie\x20eine\x20Beschwerde\x20einreichen\x20möchten\x3f';
		modalQuejasBody = 'Vielleicht\x20können\x20wir\x20Ihren\x20Vorfall\x20folgendermaßen\x20beheben\x3a';
		modalQuejasButton = 'Kontaktieren\x20Sie\x20einen\x20Vorgesetzten';
		closeLabel = 'Schließen';
	} else if (window.location.pathname.startsWith(window.urlCatalan)){
		modalQuejasTitle = 'Segur\x20que\x20voleu\x20presentar\x20una\x20queixa\x3f';
		modalQuejasBody = 'Potser\x20podem\x20atendre\x20la\x20incidència\x20a\x20través\x20de\x3a';
		modalQuejasButton = 'Contactar\x20amb\x20un\x20supervisor';
		closeLabel = 'Tancar';
	}

	// Set the modal HTML content
	var modalHTML = `
    <div class="lda-modal-header d-flex flex-row justify-content-between">
      <button type="button" class="close" data-dismiss="modal" aria-label="${closeLabel}">
        <span aria-hidden="true">
          <img src="${images_folder}/close.svg" alt="${closeLabel}"/>
        </span>
      </button>
    </div>
    <div class="lda-modal-body" id="ldaModalQuejasBody">
      <div id="ldaModalQuejasTitle" class="high-4 text-center" >${modalQuejasTitle}</div>
      <p id="ldaModalQuejasText" class="text-center">${modalQuejasBody}</p> 
    </div>
    <div class="lda-modal-footer d-flex flex-column">
      <a id="ldaModalQuejasButton" href="${modalQuejasHrefBoton}" type="button" class="lda-btn lda-btn--primary lda-btn-modal mb-2">${modalQuejasButton}</a>
      <button id="ldaModalQuejasButtonClose" type="button" class="lda-btn lda-btn--primary lda-btn-modal" data-dismiss="modal">${closeLabel}</button>
    </div>
  `;

	modalContent.innerHTML = modalHTML;
	modalDialog.appendChild(modalContent);
	modal.appendChild(modalDialog);

	if (!getElementByIdIfExists("ldaModalQuejas")) {
		// Append the modal to the document body
		document.body.appendChild(modal);

		// Add an event listener to remove the modal when it is closed
		$(modal).on('hidden.bs.modal', function () {
			$(contenedorOculto).show(500);
			// Remove the modal from the DOM
			$(modal).remove();
		});

		$(modal).modal('show');

	}
}

function createModalAhorroEnRenovacion() {
	// Get the container element
	var contenedorOculto = document.querySelector('.contenedor-modal-ahorro-renovacion');

	// Create the modal elements
	var modal = document.createElement('div');
	modal.classList.add('lda-modal', 'modal', 'fade');
	modal.id = 'ldaModalAhorroRenovacion';
	modal.tabIndex = '-1';
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('aria-labelledby', 'ldaModalAhorroRenovacionTitle');
	modal.setAttribute('aria-hidden', 'true');

	var modalDialog = document.createElement('div');
	modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
	modalDialog.role = 'document';

	var modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');
	modalContent.id = 'ldaModalAhorroRenovacionContent';

	var images_folder = Liferay.ThemeDisplay.getPathThemeImages();

	var modalAhorroRenovacionTitle = '\xbfCómo\x20se\x20aplica\x20el\x20ahorro\x20en\x20mi\x20renovación\x3f';
	var modalAhorroRenovacionBody1 = 'El\x20ahorro\x20que\x20has\x20acumulado\x20se\x20va\x20a\x20aplicar\x20de\x20manera\x20automática\x20en\x20esta\x20póliza\x3a\x20\x3cstrong\x3e\x7b0\x7d\x3c\x2fstrong\x3e';
	var modalAhorroRenovacionBody2 = 'Mientras\x20tanto\x2c\x20puedes\x20seguir\x20ahorrando\x20para\x20próximas\x20renovaciones\x20o\x20contrataciones\x2e';
	var modalAhorroRenovacionButton = 'Entendido';
	var closeLabel = 'Cerrar';

	// Set the modal HTML content
	var modalHTML = `
    <div class="lda-modal-header d-flex flex-row justify-content-end">
      <button type="button" class="close" data-dismiss="modal" aria-label="${closeLabel}">
        <span aria-hidden="true">
          <img src="${images_folder}/close.svg" alt="${closeLabel}"/>
        </span>
      </button>
    </div>
    <div class="lda-modal-body" id="ldaModalAhorroRenovacionBody">
      <div class="d-flex flex-row justify-content-center mb-3">
        <img src="${images_folder}/icono_exclamacion.png" alt="icono_exclamacion">
	  </div>
      <div id="ldaModalAhorroRenovacionTitle" class="high-4 text-center" >${modalAhorroRenovacionTitle}</div>
      <p id="ldaModalAhorroRenovacionText1" class="text-center mb-2">${modalAhorroRenovacionBody1}</p> 
      <p id="ldaModalAhorroRenovacionText2" class="text-center">${modalAhorroRenovacionBody2}</p> 
    </div>
    <div class="lda-modal-footer d-flex flex-column">
      <button id="ldaModalAhorroRenovacionButtonClose" type="button" class="lda-btn lda-btn--primary lda-btn-modal" data-dismiss="modal">${modalAhorroRenovacionButton}</button>
    </div>
  `;

	modalContent.innerHTML = modalHTML;
	modalDialog.appendChild(modalContent);
	modal.appendChild(modalDialog);

	if (!getElementByIdIfExists("ldaModalAhorroRenovacion")) {
		// Append the modal to the document body
		document.body.appendChild(modal);

		// Add an event listener to remove the modal when it is closed
		$(modal).on('hidden.bs.modal', function () {
			$(contenedorOculto).show(500);
			// Remove the modal from the DOM
			$(modal).remove();
		});

		$(modal).modal('show');

	}
}

function getSubstringValue(cotizadores, campo, i){
	var startIndex = cotizadores.indexOf(campo + i + ":") + (campo + i + ":").length ;
	var endIndex = cotizadores.indexOf(";", startIndex);
	return cotizadores.substring(startIndex, endIndex);
}

function getElementByIdIfExists(id) {
	var element = document.getElementById(id);
	if (element && element.parentNode === document.body) {
		return true;
	}
	return false;
}

AUI().ready(function () {
	var botonModalQuejasDiv = document.querySelector('.button-modal-quejas');
	if (botonModalQuejasDiv != null){
		var botonModalQuejas = botonModalQuejasDiv.querySelector('a');
		botonModalQuejas.type="button";
		botonModalQuejas.removeAttribute("href");
		botonModalQuejas.addEventListener("click", createModalQuejas);
	}
});