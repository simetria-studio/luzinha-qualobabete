// Função para preencher o tamnho do height e width automaticamente
function cols_img_babete(width, height){
    if(width < height){
        $('.back-3').find('.col-custom').eq(0).removeClass('col-6');
        $('.back-3').find('.col-custom').eq(1).removeClass('col-6');
        $('.back-3').find('.col-custom').eq(0).addClass('col-12');
        $('.back-3').find('.col-custom').eq(1).addClass('col-12');
    }else{
        $('.back-3').find('.col-custom').eq(0).addClass('col-6');
        $('.back-3').find('.col-custom').eq(1).addClass('col-6');
        $('.back-3').find('.col-custom').eq(0).removeClass('col-12');
        $('.back-3').find('.col-custom').eq(1).removeClass('col-12');
    }
}

// Função para preencher o tamnho do height e width automaticamente
$(function(){
    // console.log($(window));
    var width = $(window).width();
    var height = $(window).height();

    $('.back').find('section').css({
        'width': width+'px',
        'height': height+'px'
    });

    cols_img_babete(width, height);
});

// Quando girar o celular girar a tela
$(window).on('orientationchange',function(){
    var width = $(window).width();
    var height = $(window).height();

    $('.back').find('section').css({
        'width': height+'px',
        'height': width+'px'
    });

    cols_img_color(width, height);
});
// Quando ouver mudança no tamnho da tela atualizar o tamnho do block
$(window).on('resize',function(){
    var width = $(window).width();
    var height = $(window).height();

    $('.back').find('section').css({
        'width': width+'px',
        'height': height+'px'
    });

    cols_img_color(width, height);
});

// Essa função serve para distribuir a imagem aleatoriamente
function img_color(){
    var babetes = [
        '<div class="div-img"><img data-id="valid" class="img-fluid" src="./img/Vector 1.svg" alt=""></div>',
        '<div class="div-img"><img data-id="invalid" src="./img/Vector 2.svg" alt=""></div>',
        '<div class="div-img"><img data-id="invalid" src="./img/Star 1.svg" alt=""></div>',
        '<div class="div-img"><img data-id="invalid" src="./img/Rectangle 1.svg" alt=""></div>',
        '<div class="div-img"><img data-id="invalid" src="./img/Polygon 1.svg" alt=""></div>',
        '<div class="div-img"><img data-id="invalid" src="./img/Ellipse 11.svg" alt=""></div>'
    ];

    // Cores
    for(var i=1; i < 7; i++){
        const colorPosition = Math.floor(Math.random() * babetes.length);
        $('.back-3 .icon-'+i).html(babetes[colorPosition]);
        babetes.splice(colorPosition, 1);
    }
}

// Iniciado o droppable
function iniciar_dropp(){
    $( ".icons" ).find('img').draggable({
        revert: function(ui){
            if(ui){
                if($(this).attr('data-id') == ui.attr('data-id')){
                    return false
                }else{
                    return true
                }
            }else{
                return true;
            }
        }
    });
    // Ativar evento caso esteje o botão por cima
    $("#babete_div").droppable({
        drop: function( event, ui ) {
            // quando a cor estiver em cima do violino
            if(ui){
                var id_luzinha = $(this).attr('data-id'); // Pega a cor em hexadecimal
                var id_babete = ui.draggable.attr('data-id'); // Pega a cor em hexadecimal
                // Vericamos se a cor estiver certa continua
                if(id_luzinha == id_babete){
                    // Segundo tempo
                    setTimeout(()=>{
                        $('.div-correto').removeClass('d-none'); // Apesentando os parabes

                        setTimeout(()=>{
                            $('.div-correto').css('z-index', '0'); // Zerando o z-index
                            $('.back-1').css('z-index', '50'); // Adiconado z-index pára dar um efeito

                            // Fazendo aparacer o botão play
                            $('.back-1').show('slide', {}, 1000, function() {
                                $('.back-1').css('display', 'flex'); // setando o flex o do botão, bug do jquery-ui

                                $('.div-correto').addClass('d-none'); // Escondendo os parabens
                                // Escondendo o joqeuinho
                                $('.back-3').hide( 'slide', {}, 1000, function() {
                                    img_color(); // Resetando o jogo
                                    $('.div-correto').css('z-index', '50'); // Deixando em 50 o z-index
                                    $('.back-1').css('z-index', '0'); // Retirando o z-index
                                });
                            });
                            $('.back-1').css('display', 'flex'); // setando o flex o do botão, bug do jquery-ui
                        }, 1500);
                    }, 300);
                }else{ // Casoa  cor não esteje certa
                    $('.div-erro').removeClass('d-none');
                    $('.back-3').effect( 'shake', {}, 500, function() {
                        $('.div-erro').addClass('d-none');
                    });
                }
            }
        }
    });
}

$(document).ready(function(){
    $(img_color()); // Chamaos a função quando carrega a pagina
    $(iniciar_dropp()); // Chamaos a função quando carrega a pagina
    // Carregando o jogo
    setTimeout(()=>{
        // Função para iniciar o jogo
        $('.back-3').show( 'slide', {}, 1000, function() {
            $('.back-2').hide('slide', {}, 1000);
        });
    }, 1500);
    // Iniciar o Jogo novamente
    $(document).on('click', '#play', function(){
        iniciar_dropp(); // iniciado a função novamente
        
        setTimeout(() => {
            $('.back-2').show( 'slide', {}, 1000, function() {
                $('.back-1').hide('slide', {}, 1000, function(){
                    setTimeout(()=>{
                        $('.back-3').show( 'slide', {}, 1000, function() {
                            $('.back-2').hide('slide', {}, 1000);
                        });
                    }, 500);
                });
            });
        }, 200);
    });
});