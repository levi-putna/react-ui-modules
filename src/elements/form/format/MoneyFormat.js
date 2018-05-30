export default class MoneyFormat {

    constructor(){

    }

    formatString(value){
        if(!value){
            return '';
        }

        if (typeof Intl === "undefined" || !Intl.NumberFormat) {
            console.log("This browser doesn't support Intl.NumberFormat");
            return value;
        }

        return Intl.NumberFormat().format(value);
    }

}