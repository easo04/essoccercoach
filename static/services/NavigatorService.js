class NavigatorService{
    static isMobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    static language(){
        return navigator.language;
    }
    static userAgent(){
        return navigator.userAgentData?.brands[1].brand;
    }
    static userAgentVersion(){
        return navigator.userAgentData.brands[1].version;
    }
    static platform(){
        navigator.platform;
    }
}

export default NavigatorService;