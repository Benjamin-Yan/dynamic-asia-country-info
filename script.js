// Ref apis (https://restcountries.com/)
// 1.by country: https://restcountries.com/v3.1/name/japan?fields=name,currencies,capital,maps,car,timezones,flags
// 2.by area: https://restcountries.com/v3.1/region/asia?fields=name,currencies,capital,maps,car,timezones,flags
// fields I interest: name,currencies,capital,maps,car,timezones,flags

function renderCountryInfo(data) {
    const container = document.getElementById('country-info');
    container.innerHTML = '';

    data.forEach((country, index) => {
        // 處理本地名稱
        const nativeNames = country.name.nativeName;
        let nativeNameContent = '';
        if (nativeNames) {
            for (const lang in nativeNames) {
                const names = nativeNames[lang];
                if (names.common && names.official) {
                    nativeNameContent += `${names.common} (${names.official}) `;
                }
            }
        }

        // 處理貨幣
        const currencyCodes = Object.keys(country.currencies);
        let firstCurrencyCode = firstCurrencySymbol = '';
        if (currencyCodes.length > 0) {
            firstCurrencyCode = currencyCodes[0];
            firstCurrencySymbol = country.currencies[firstCurrencyCode].symbol;
        }

        // 行駛方向
        let direction = '';
        if(country.car.side === 'right') {
            direction = '右駕';
        } else {direction = '左駕';}

        const html = `
                <div class="column">
                    <div class="country-card">
                        <div class="image">
                            <a href="${country.maps.googleMaps}" target="_blank"><img src="${country.flags.png}" alt="${country.name.common} 的國旗" class="flag"></a>
                        </div>
                        <div class="content">
                            <h3>${country.name.common}</h3>
                            <p><strong>正式名稱:</strong> ${country.name.official}</p>
                            <p><strong>本地名稱:</strong> ${nativeNameContent.trim()}</p>
                            <p><strong>首都:</strong> ${country.capital.join(', ')}</p>
                            <p><strong>貨幣:</strong> ${firstCurrencyCode} (${firstCurrencySymbol})</p>
                            <p><strong>時區:</strong> ${country.timezones}</p>
                            <p><strong>行駛方向:</strong> ${direction}</p>
                        </div>
                    </div>
                </div>
                `;

        container.innerHTML += html;
    });
}

// fetch('test.json')
//     .then(r => r.json())
//     .then(result => {
//         renderCountryInfo(result);
//     })
//     .catch(error => {
//         console.error('Error loading data:', error);
//     });

fetch('https://restcountries.com/v3.1/region/asia?fields=name,currencies,capital,maps,car,timezones,flags')
    .then(r => r.json())
    .then(result => {
        renderCountryInfo(result);
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

