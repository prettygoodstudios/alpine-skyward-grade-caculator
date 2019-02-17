
function roundUp(v, n) {
    return Math.ceil(v * Math.pow(10, n)) / Math.pow(10, n);
}

export const calculateGrade = (report) => {
    let finalGrade = 0;
    let tot = 0;
    let flagForMissingWeight = false;
    let missingWieghtValue = 0;
    report.forEach((cat) => {
        if(Number.isInteger(cat.weight)){
            tot += parseInt(cat.weight);
        }
        if(cat.weight == "00"){
            flagForMissingWeight = true;
        }
    });
    if(flagForMissingWeight){
        missingWieghtValue = 100 - tot;
        tot = 100;
    }
    const trueTotalWieght = tot;
    let totalPoints = 0;
    report.forEach((b) => { 
        if(Number.isInteger(b.score.total)){
            totalPoints += parseFloat(b.score.total);
        }
    });
    report.forEach((cat) => {
        const {weight, score} = cat;
        const {earned, total} = score;
        let trueWeight = Number.isInteger(weight) ? (parseInt(weight)/trueTotalWieght) : total/totalPoints;
        if(flagForMissingWeight && weight == "00"){
            trueWeight = (missingWieghtValue/trueTotalWieght);
        }
        if(trueWeight == NaN || earned == NaN || !Number.isInteger(weight) ){
            console.log("True Weight", trueWeight);
            console.log("Total", total);
            console.log("Total Points", totalPoints);
            console.log("Earned", earned);
        }
        if(earned && total){
            finalGrade += (parseFloat(earned)/parseFloat(total))*trueWeight;
        }
    });
    return roundUp(finalGrade * 100, 2);
}