export const getPosition = () => {

    const geolocation = navigator.geolocation;

    return new Promise(
        (resolve, reject) => {
            geolocation.getCurrentPosition(
                (res) => {
                    resolve(res)
                },
                (err) => {
                    reject(err)
                },
                { maximumAge:30000, timeout:3000, enableHighAccuracy:true });
        });

};