// Vars
var cookies = 0,
    cookies2 = cookies,
    cookies3 = cookies,
    cookies4 = cookies,
    cps = 0,
    powerClicks = 0,
    powerClickCost = 25,
    appleFarms = 0,
    perClick = 1,
    appleFarmCost = 150,
    cookieFactoryCost = 1250,
    cookieFactories = 0,
    inCheatMode = false,
    cbc = '#06bc00',
    aa1m = false;
// Functions
$(document).ready(function() {
    $(".mainCookie").click(function() {
        cookies = cookies + perClick;
        if(cookies >= 1000000) {
            AMillionCookies();
        }
    });
    important();
    $(".cheat").click(function() {
        powerClickCost = 0,
            inCheatMode = true,
            cookieFactoryCost = 0,
            cookies += 1000000,
            appleFarmCost = 0;
        cAlert({
            title: 'Vous êtes maintenant entré en mode triche, pour sortir appuyez sur le bouton Redémarrer. Aucune statistique ne sera enregistrée et aucun accomplissement ne sera accordé.',
            type:'info'
        });
    })
    $(".restart").click(function() {
        if(inCheatMode == true) {
            cAlert({
                title: 'Sorti du mode triche. Toutes les données ont été réinitialisées.',
                type:'success'
            });
        } else {
            cAlert({
                title:'Toutes les données ont été réinitialisées.',
                type:'success'
            })
        }
        powerClickCost = 25,
            inCheatMode = false,
            cookieFactoryCost = 1250,
            cookies = 0,
            cps = 0,
            perClick = 1,
            appleFarmCost = 150;
    })
    setInterval(refresh,1);
    setInterval(refresh2,1);
    setInterval(addCPS,1000);
});
function addCPS() {
    cookies = cookies + cps;
}
function refresh2() {

}
function refresh() {
    $("#cookies").html(cookies + " Cookies");
    $("#perClick").html(perClick + " Cookies par clic");
    $(".cps").html(cps + " CPS");
    $(".pp").html("Tu as un multiplicateur de "+(powerClicks + 1)+".<br />Prix: "+powerClickCost+" Cookies<br />Tu as besoin de "+cookies2+" cookies de plus.");
    if(cookies > powerClickCost) {
        $(".pp").html("Tu as un multiplicateur de "+(powerClicks + 1)+".<br />Prix: "+powerClickCost+" Cookies<br />Tu as besoin de 0 cookies en plus.");
    } else {
        cookies2 = powerClickCost - cookies;
    }
    $(".af").html("Tu as "+appleFarms+" ferme(s) à pommes.<br />Prix: "+appleFarmCost+" Cookies<br />Tu as besoin de "+cookies3+" cookies de plus.");
    if(cookies > appleFarmCost) {
        $(".af").html("Tu as "+appleFarms+" ferme(s) à pommes.<br />Prix: "+appleFarmCost+" Cookies<br />Tu as besoin de 0 cookies en plus.");
    } else {
        cookies3 = appleFarmCost - cookies;
    }
    $(".cf").html("Tu as "+cookieFactories+" usine à cookies.<br />Prix: "+cookieFactoryCost+" Cookies<br />Tu as besoin de "+cookies4+" cookies de plus.");
    if(cookies > cookieFactoryCost) {
        $(".cf").html("Tu as "+cookieFactories+" usine à cookies.<br />Prix: "+cookieFactoryCost+" Cookies<br />Tu as besoin de 0 cookies en plus.");
    } else {
        cookies4 = cookieFactoryCost - cookies;
    }
}
function buyPowerClick() {
    if(cookies >= powerClickCost) {
        perClick = perClick + 1;

        powerClicks = powerClicks + 1;
        cookies = cookies - powerClickCost;
        powerClickCost = Math.round(Math.pow(powerClickCost,1.1));
        purchaseSuccess("click upgrade");
        setActivity("Tu as amélioré ton multiplicateur!<br />Celui si est désormais de "+(powerClicks + 1)+"!");
    } else {
        purchaseFailed();
    }
}
function buyAppleFarm() {
    if(cookies >= appleFarmCost) {
        cps = cps + 1;
        appleFarms = appleFarms + 1;
        cookies = cookies - appleFarmCost;
        appleFarmCost = Math.round(Math.pow(appleFarmCost,1.06));
        purchaseSuccess("apple farm");
        setActivity("Tu as acheté une nouvelle ferme à pommes!<br />Tu en as désormais "+appleFarms+"!");
    } else {
        purchaseFailed();
    }
}
function buyCookieFactory() {
    if(cookies >= cookieFactoryCost) {
        cps = cps + 5;
        cookieFactories = cookieFactories + 1;
        cookies = cookies - cookieFactoryCost;
        cookieFactoryCost = Math.round(Math.pow(cookieFactoryCost,1.08));
        purchaseSuccess("cookie factory");
        setActivity("Tu as acheté une nouvelle usine à cookies!<br />Tu en as désormais "+cookieFactories+"!");
    } else {
        purchaseFailed();
    }
}
function purchaseSuccess(itemPurchased) {
    swal({
        title:'Achat effectué avec succès.',
        toast:true,
        showConfirmButton:false,
        timer:2000,
        type:'success',
        position:'top-end',
    });
}
function purchaseFailed() {
    swal({
        title:'Achat échoué : Cookies insuffisants.',
        toast:true,
        showConfirmButton:false,
        timer:2000,
        type:'error',
        position:'top-end',
    });
}
function setActivity(text) {
    $("#activity").html(text);
    setTimeout(function() {
        $("#activity").html("Pas d\'activité récente.");
    },3000);
}
function AMillionCookies() {
    if(inCheatMode == false) {
        if(aa1m == false) {
            swal({
                title:'Vous avez obtenu 1 000 000 cookies ! Félicitations, à ce stade, on peut considérer que vous avez terminé le jeu !',
                type:'info',
                showConfirmButton:true,
                confirmButtonColor:'#06bc00',
                confirmButtonText:'Cool'
            });
            aa1m = true;
        }
    }
}
const cAlert = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
});
const ipAPI = 'https://api.ipify.org?format=json';
function important() {
    swal.queue([{
        title: 'Si quoi que ce soit que vous faites est illégal dans notre jeu, j\'ai ton adresse IP.',
        confirmButtonText: 'Voir mon IP',
        confirmButtonColor: cbc,
        text:
            'Si vous ne me croyez pas, cliquez sur le bouton \'Voir mon IP\'.',
        showLoaderOnConfirm: true,
        preConfirm: () => {

            return fetch(ipAPI)
                .then(response => response.json())

                .then(data => swal.insertQueueStep(data.ip))
                .catch(() => {
                    swal.insertQueueStep({
                        type: 'error',
                        title: 'Impossible d\'obtenir votre adresse IP.'
                    })
                })
        }
    }])}



















