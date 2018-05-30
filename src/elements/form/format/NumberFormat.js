export default class NumberFormat {

    constructor(config = {}) {
        this.config = Object.assign(
            {
                numeralPositiveOnly: false,
                stripLeadingZeroes: true,
                numeralDecimalMark: '.',
                delimiter: ',',
                numeralIntegerScale: 3,
                numeralDecimalScale: 2
            },
            config);


    }

    formatString(value) {
        const {config} = this;

        if (!value) {
            return '';
        }

        value = value.toString();

        let partInteger = '';
        let partDecimal = '';
        let parts = null;

        // strip alphabet letters
        value = value.replace(/[A-Za-z]/g, '')

        // replace the first decimal mark with reserved placeholder
        .replace(config.numeralDecimalMark, 'M')

        // strip non numeric letters except minus and "M"
        // this is to ensure prefix has been stripped
        .replace(/[^\dM-]/g, '')

        // replace the leading minus with reserved placeholder
        .replace(/^\-/, 'N')

        // strip the other minus sign (if present)
        .replace(/\-/g, '')

        // replace the minus sign (if present)
        .replace('N', config.numeralPositiveOnly ? '' : '-')

        // replace decimal mark
        .replace('M', config.numeralDecimalMark)

        // strip any leading zeros
        if (config.stripLeadingZeroes) {
            value = value.replace(/^(-)?0+(?=\d)/, '$1');
        }

        if (value.indexOf(config.numeralDecimalMark) >= 0) {
            parts = value.split(config.numeralDecimalMark);
            partInteger = parts[0];
            partDecimal = config.numeralDecimalMark + parts[1].slice(0, config.numeralDecimalScale);
        } else {
            partInteger = value;
        }

        if (config.numeralIntegerScale > 0) {
            const exp = "(\\d)(?=(\\d{" + config.numeralIntegerScale + "})+$)";
            partInteger = partInteger.replace(new RegExp(exp, 'g'), '$1' + config.delimiter);
        }

        return partInteger.toString() + (config.numeralDecimalScale > 0 ? partDecimal.toString() : '');
    }

}