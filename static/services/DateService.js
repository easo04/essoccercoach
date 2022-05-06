
const DAYS_OF_WEEK = {
    fr:[
        {day:7, label:'Dimanche', abbreviationLarge:'Dim.', abbreviationSmall:'Dim'},
        {day:1, label:'Lundi', abbreviationLarge:'Lun.', abbreviationSmall:'Lun'},
        {day:2, label:'Mardi', abbreviationLarge:'Mar.', abbreviationSmall:'Mar'},
        {day:3, label:'Mercredi', abbreviationLarge:'Mercr.', abbreviationSmall:'Mer'},
        {day:4, label:'Jeudi', abbreviationLarge:'Jeu.', abbreviationSmall:'Jeu'},
        {day:5, label:'Vendredi', abbreviationLarge:'Vendr.', abbreviationSmall:'Ven'},
        {day:6, label:'Samedi', abbreviationLarge:'Sam.', abbreviationSmall:'Sam'},
    ],
    en:[
        {day:1, label:'Monday', abbreviationLarge:'Mon.', abbreviationSmall:'Mo'},
        {day:2, label:'Tuesday', abbreviationLarge:'Tue.', abbreviationSmall:'Tu'},
        {day:3, label:'Wednesday', abbreviationLarge:'Wed.', abbreviationSmall:'We'},
        {day:4, label:'Thursday', abbreviationLarge:'Thu.', abbreviationSmall:'Th'},
        {day:5, label:'Friday', abbreviationLarge:'Fri.', abbreviationSmall:'Fr'},
        {day:6, label:'Saturday', abbreviationLarge:'Sat.', abbreviationSmall:'Sa'},
        {day:7, label:'Sunday', abbreviationLarge:'Sun.', abbreviationSmall:'Su'}
    ],
};

const MONTHS_OF_YEAR = {
    fr:[
        {month:0, label:'Janvier', abbreviationLarge:'Janv.', abbreviationSmall:'Jan'},
        {month:1, label:'Février', abbreviationLarge:'Févr.', abbreviationSmall:'Fév'},
        {month:2, label:'Mars', abbreviationLarge:'Mars', abbreviationSmall:'Mars'},
        {month:3, label:'Avril', abbreviationLarge:'Avr.', abbreviationSmall:'Avr'},
        {month:4, label:'Mai', abbreviationLarge:'Mai', abbreviationSmall:'Mai'},
        {month:5, label:'Juin', abbreviationLarge:'Juin', abbreviationSmall:'Jun'},
        {month:6, label:'Juillet', abbreviationLarge:'Juill.', abbreviationSmall:'Jul'},
        {month:7, label:'Août', abbreviationLarge:'Août', abbreviationSmall:'Août'},
        {month:8, label:'Septembre', abbreviationLarge:'Sept.', abbreviationSmall:'Sep'},
        {month:9, label:'Octobre', abbreviationLarge:'Oct.', abbreviationSmall:'Oct'},
        {month:10, label:'Novembre', abbreviationLarge:'Nov.', abbreviationSmall:'Nov'},
        {month:11, label:'Decembre', abbreviationLarge:'Déc.', abbreviationSmall:'Déc'},
    ],
    en:[
        {month:0, label:'January', abbreviationLarge:'Jan.', abbreviationSmall:'Jan'},
        {month:1, label:'February', abbreviationLarge:'Feb.', abbreviationSmall:'Feb'},
        {month:2, label:'March', abbreviationLarge:'Mar.', abbreviationSmall:'Mar'},
        {month:3, label:'April', abbreviationLarge:'Apr.', abbreviationSmall:'Apr'},
        {month:4, label:'May', abbreviationLarge:'May .', abbreviationSmall:'May'},
        {month:5, label:'June', abbreviationLarge:'Jun .', abbreviationSmall:'Jun'},
        {month:6, label:'July', abbreviationLarge:'Jul.', abbreviationSmall:'Jul'},
        {month:7, label:'August', abbreviationLarge:'Aug.', abbreviationSmall:'Aug'},
        {month:8, label:'September', abbreviationLarge:'Sep.', abbreviationSmall:'Sep'},
        {month:9, label:'October', abbreviationLarge:'Oct.', abbreviationSmall:'Oct'},
        {month:10, label:'November', abbreviationLarge:'Nov.', abbreviationSmall:'Nov'},
        {month:11, label:'December', abbreviationLarge:'Dec.', abbreviationSmall:'Dec'},
    ]
}

class DateService{

    static getDayOfWeek(date, lang){
        if(lang !== 'en' && lang !== 'fr'){
            return null;
        }

        const day = date.getDay();

        if(lang === 'en'){
            return DAYS_OF_WEEK.en.find(d=>d.day === day);
        }

        if(lang === 'fr'){
            return DAYS_OF_WEEK.fr.find(d=>d.day === day);
        }
    }

    static getLabelDayOfWeek(date, lang){
        return this.getDayOfWeek(date, lang).label;
    }

    static getHourAndMinutes(date){
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    static getDay(date){
        return date.getDate();
    }

    static getMonth(date, lang){
        if(lang !== 'en' && lang !== 'fr'){
            return null;
        }

        const month = date.getMonth();

        if(lang === 'en'){
            return MONTHS_OF_YEAR.en.find(m=>m.month === month);
        }

        if(lang === 'fr'){
            return MONTHS_OF_YEAR.fr.find(m=>m.month === month);
        } 
    }

    static getMonthLabel(date, lang){
        return this.getMonth(date, lang).label;
    }

    static getYear(date){
        return date.getFullYear();
    }

    /**
     * Retourne la date en français dans le format suivant: 
     * weekday day month. year
     * ex: mercredi 21 juil. 2021
     * @param {*} date la date à convertir
     */
    static getDateFormatFR(date){
        return this.getDateFormat(date, 'fr');
    }

    static getDateFormatEN(date){
        return this.getDateFormat(date, 'en');
    }

    /**
     * Retourne la date selon la langue
     * @param {*} date la date à convertir
     * @param {*} langue la langue à utiliser 
     */
    static getDateFormat(date, langue){
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
        return Intl.DateTimeFormat(langue, options).format(date)
    }

    /**
     * Retourne la date dans le format dd/mm/yyyy
     */
    static getDateFormatSimple(date, langue){
        return Intl.DateTimeFormat(langue).format(date)
    }

    static getMonthsOfYear(lang){
        return lang === 'fr' ? MONTHS_OF_YEAR.fr : MONTHS_OF_YEAR.en;
    }

    static getDaysOfWeek(lang){
        return lang === 'fr' ? DAYS_OF_WEEK.fr : DAYS_OF_WEEK.en;
    }

    static getDaysInCurrentMonth(){
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        return new Date(year, month+1, 0).getDate();
    }

    static getFirstDayOfCurrentMonth(){
        const now = new Date();

        return new Date(now.getFullYear(), now.getMonth());
    }

    static getCurrentDateWithoutTime(){
        const date = new Date();
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }
}

export default DateService;