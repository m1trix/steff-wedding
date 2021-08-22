'use strict';

async function getActiveOffers() {
    const body = await httpGet('/data/discounts.json');
    const now = new Date();
    return JSON.parse(body).filter(offer => {
        return toDate(offer.start) <= now && now < toDate(offer.end);
    });
}

function getBestCollectionDiscount(sCollectionId, aOffers) {
    var bestDiscount = 0;
    aOffers.forEach(oOffer => {
        oOffer.discounts.forEach(oDiscount => {
            if (oDiscount.collections.includes('*') || oDiscount.collections.includes(sCollectionId)) {
                bestDiscount = Math.max(oDiscount.amount, bestDiscount);
                return;
            }
        });
    });

    return bestDiscount;
}

function getBestCollectionDiscount(sCollectionId, sDressId, aOffers) {
    var bestDiscount = 0;
    aOffers.forEach(oOffer => {
        oOffer.discounts.forEach(oDiscount => {
            if (oDiscount.collections.includes('*') || oDiscount.collections.includes(sCollectionId)) {
                bestDiscount = Math.max(oDiscount.amount, bestDiscount);
                return;
            }
        });
    });

    return bestDiscount;
}

function toDate(sDate) {
    return new Date(sDate);
}