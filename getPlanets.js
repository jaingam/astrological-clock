import * as THREE from "three";



const loader = new THREE.TextureLoader;
const julianDate = new Date().getTime() / 86400000 + 2440587.5;
let dtt = julianDate - 2451545.0; 
let t = dtt / 36525.0; //The fraction of the century elapsed since the reference date.
const obliquity = 23 + 26 / 60 + 21.448 / 3600 - 46.815 / 3600 * t - 0.00059 / 3600 * t * t + 0.001813 * t * t * t;
const today = new Date().toLocaleDateString("en-CA");
const earthSize = 5;
const earthMeanRaius = 6271.01;
// function calculateLocalSiderealTime(longitude) {
//     // let latitude,longitude;
//     let greenwichMeanSiderealTime = 280.46061837 + 360.98564736629 * dtt + 0.000387933 * (t ** 2) - (t ** 3) / 38710000
//     let SiderealTimeModded = greenwichMeanSiderealTime % 360;
//     let hour = SiderealTimeModded / 15; //greenwich sidereal time
//     // console.log(hour);

//     let localHour = longitude / 15;
//     let localMeanTime = hour + localHour; //local sidereal time

//     const ramc = (localMeanTime) * 15;
//     // console.log(getMC(ramc)*180/Math.PI);
//     return ramc; // in degree unit

// }


// Shininess is taken from the albedo of each planet.
export const getEarth = () => {

    const earthGroup = new THREE.Group()
    const geometry = new THREE.SphereGeometry(earthSize);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/earthmap1k.jpg",),
        lightMap: loader.load("./textures/earthlights1k.jpg"),
        bumpMap: loader.load("./textures/earthbump1k.jpg"),
        bumpScale: 0.1,
        specularMap: loader.load("./textures/earthspec1k.jpg"),
        specular: 0xFFFFFF,
        // roughness : 1- 0.294,
        shininess : 0.367
    });
    const earthMesh = new THREE.Mesh(geometry, material);
    const lightsMat = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/earthlights1k.jpg"),
        blending: THREE.AdditiveBlending
    });
    const lightMesh = new THREE.Mesh(geometry, lightsMat);
    const earthLight = new THREE.PointLight(0xff0000, 1);
    earthMesh.add(earthLight)
    earthGroup.add(earthMesh);
    earthGroup.add(lightMesh);
  
    earthGroup.castShadow = true;
    earthGroup.receiveShadow=true;
    const [x,y,z] = getPosition(julianDate,1.00000261,0.00000562,0.01671123,-0.00004392,
        -0.00001531,-0.01294668, 100.46457166,35999.37244981, 102.93768193, 0.32327364 ,0,0
    )
    console.log(x,y,z)
    earthGroup.position.set(x, y, z)
    
    earthGroup.rotateY(23.4392911 * Math.PI/180);
    earthGroup.rotateX(Math.PI/2);
    return [earthGroup, earthGroup.position];
}

export const getMercury = () => {

    const mercuryGroup = new THREE.Group()
    const geometry = new THREE.SphereGeometry(earthSize * 2439.4 / earthMeanRaius);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/mercurymap.jpg",),
        bumpMap: loader.load("./textures/mercurybump.jpg"),
        bumpScale: 0.1,
        // roughness : 1-  0.088
        shininess :  0.088
    });
    const mercuryMesh = new THREE.Mesh(geometry, material);
    mercuryGroup.add(mercuryMesh);
    const [x,y,z] = getPosition(julianDate,0.38709927,0.00000037,0.20563593,0.00001906,
        7.00497902,-0.00594749, 252.25032350,149472.67411175, 77.45779628,0.16047689 ,48.33076593,-0.12534081
    )
    console.log(x,y,z)
    mercuryGroup.position.set(x, y, z)
    mercuryGroup.rotateX(2.11/60 * Math.PI/180);
    mercuryGroup.rotateX(Math.PI/2);

    return mercuryGroup;
}


export const getVenus = () => {

    const venusGroup = new THREE.Group()
    const geometry = new THREE.SphereGeometry(earthSize * 6051.84 / earthMeanRaius);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/venusmap.jpg",),
        bumpScale: 0.1,
        // roughness : 1- 0.77,
        shininess: 0.65
    });
    const venusMesh = new THREE.Mesh(geometry, material);
    venusGroup.add(venusMesh);
    const [x,y,z] = getPosition(julianDate,0.72333566,0.00000390,0.00677672,-0.00004107,
        3.39467605,-0.00078890, 181.97909950,58517.81538729, 131.60246718,0.00268329 ,76.67984255,-0.27769418
    )
    console.log(x,y,z)
    venusGroup.position.set(x, y, z)
    venusGroup.rotateX(177.36 * Math.PI / 180);
    venusGroup.rotateX(Math.PI/2);
    return venusGroup;
}

export const getMars = () => {
    const marsGroup = new THREE.Group()
    const geometry = new THREE.SphereGeometry(earthSize * 3389.92 / earthMeanRaius);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/marsmap.jpg",),
        bumpMap: loader.load("./textures/marsbump.jpg"),
        bumpScale: 0.1,
        shininess: 0.150
        
    });
    const marsMesh = new THREE.Mesh(geometry, material);
    marsGroup.add(marsMesh);
    const [x,y,z] = getPosition(julianDate, 1.52371034, 0.00001847, 0.09339410, 0.00007882,
        1.84969142, -0.00813131, 4.55343205, 19140.30268499, -23.94362959, 0.44441088, 49.55953891, -0.29257343
    )
    console.log(x,y,z)
    marsGroup.position.set(x, y, z)
    marsGroup.rotateX(25.19 * Math.PI/180);
    marsGroup.rotateX(Math.PI/2);
    return marsGroup;
}

export const getJupiter = () => {

    const jupiterGroup = new THREE.Group()
    const geometry = new THREE.SphereGeometry(earthSize * 69911 / earthMeanRaius);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/jupitermap.jpg",),
        shininess: 0.52
    });
    const jupiterMesh = new THREE.Mesh(geometry, material);
    jupiterGroup.add(jupiterMesh);
    const [x,y,z] = getPosition(julianDate, 5.20288700, -0.00011607, 0.04838624, -0.00013253,
        1.30439695, -0.00183714, 34.39644051, 3034.74612775, 14.72847983, 0.21252668, 0.20469106, -13.66242448
    )
    console.log(x,y,z)
    jupiterGroup.position.set(x, y, z)
    jupiterGroup.rotateX(Math.PI/2);
    jupiterGroup.rotateX(3.13 * Math.PI/180);

    return jupiterGroup;
}


export const getSaturn = () => {

    const saturnGroup = new THREE.Group()
    const geometry = new THREE.SphereGeometry(earthSize * 58232 / earthMeanRaius);
    const material = new THREE.MeshPhongMaterial({
        map: loader.load("./textures/saturnmap.jpg",),
        shininess: 0.47
        // side: THREE.DoubleSide
    });

    const saturnMesh = new THREE.Mesh(geometry, material); 
    saturnMesh.castShadow = true;
    // saturnMesh.receiveShadow = true;
    saturnGroup.add(saturnMesh);

    const ringGeometry = new THREE.RingGeometry(earthSize * (6,630 + 58232) / earthMeanRaius, earthSize * (120,700 + 58232)/earthMeanRaius, 32); //(120,700+58232)/6371.0 //(ring radius+radius)/earthRadius
    const ringMap = loader.load("./textures/saturnringcolor.jpg")
    ringMap.wrapS = THREE.RepeatWrapping
    ringMap.wrapT = THREE.RepeatWrapping ;
    const ringAlphaMap= loader.load("./textures/saturnringalpha.jpg");
    ringAlphaMap.wrapS= THREE.RepeatWrapping
    ringAlphaMap.wrapT= THREE.RepeatWrapping ;
    const ringMaterial = new THREE.MeshPhongMaterial({
        map: ringMap,
        alphaMap: ringAlphaMap,
        side: THREE.DoubleSide,
        // shadowSide: THREE.DoubleSide,
        // shininess : 0.6,
        transparent:true
    });

    let pos = ringGeometry.attributes.position;
    let v3 = new THREE.Vector3();

    let thetaSegments = ringGeometry.parameters.thetaSegments || 0;
    for (let i = 0; i < pos.count; i++){
        v3.fromBufferAttribute(pos, i);
        let v = v3.length();
        ringGeometry.attributes.uv.setXY(i, v < 47 ? 0 : 1, v);
        // I got the solution to the texture mapping from https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990/3.
    }

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.receiveShadow = true;
    // ring.castShadow = true;
   
    saturnGroup.add(ring); 

    const [x,y,z] = getPosition(julianDate, 9.53667594, -0.00125060, 0.05386179, -0.00050991,
        2.48599187, 0.00193609, 49.95424423, 1222.49362201, 92.59887831, -0.41897216, 113.66242448, -0.28867794
    )

    console.log(x,y,z);
    saturnGroup.position.set(x, y, z);

    // const pl = new THREE.PointLight(0xff0000,1,0,0)
    // pl.castShadow = true;
    // pl.position.set(x,y,z+400)
    // saturnGroup.add(pl);
    saturnMesh.rotateX(Math.PI/2);
    saturnGroup.rotateX(26.73 * Math.PI/180);
    return saturnGroup;
}


// function getMC(ramc) {

//     console.log(Math.atan(Math.tan(ramc * (Math.PI / 180)) / Math.cos(obliquity * (Math.PI / 180))));
//     return Math.atan(Math.tan(ramc * (Math.PI / 180)) / Math.cos(obliquity * (Math.PI / 180)));
// }
// function getAsc(ramc, latitude) {

//     return acot(-((Math.tan(latitude * (Math.PI / 180)) * Math.sin(obliquity * (Math.PI / 180))) +
//         (Math.sin(ramc * (Math.PI / 180)) * Math.cos(obliquity * (Math.PI / 180)))) / Math.cos(ramc * (Math.PI / 180)));// in degree unit

// }
const geMoonPosition = (julianDate,
    semiMajorAxis0, semiMajorAxisCent, 
    eccentricity0, eccentricityCent,
    inclination0, inclinationCent,
    meanLongtitude0, meanLongtitudeCent, 
    longitudePeri0,longitudePeriCent,
    longitudeAsc0, longitudeAscCent,
    b=0, c=0, s=0, f=0) => {
    // Formulae from https://ssd.jpl.nasa.gov/planets/approx_pos.html

    const semiMajorAxis = semiMajorAxis0+ t* semiMajorAxisCent;
    const eccentricity = eccentricity0+ t* eccentricityCent;
    const inclination = inclination0+ t* inclinationCent;
    const meanLongtitude = meanLongtitude0+ t* meanLongtitudeCent;
    const longitudePeri = longitudePeri0+ t* longitudePeriCent;
    const longitudeAsc = longitudeAsc0+ t* longitudeAscCent;

    const perihelion = longitudePeri-longitudeAsc;

    let meanAnomaly = meanLongtitude-longitudePeri+ b*t*t + c*Math.cos(f*julianDate*Math.PI/180) + s*Math.sin(f*julianDate*Math.PI/180)

    if(meanAnomaly%360>=0 && meanAnomaly%360<=180) meanAnomaly = meanAnomaly%360;
    else meanAnomaly = meanAnomaly%360 - 360;
    // console.log("meanAnomaly: deg"+meanAnomaly)

    // let minMeanAnom = 360;
    let minDif = 360;

    let eccentricAnomaly = 0;
    let prevDif1=360;
    let prevDif2=360;

    for(let i=0;i<180;i+=0.001) {
        // could be optimized, but it's already an approximated value.
        // find the eccentric anomaly by iterating from 0° to 180° and 0° to -180°
        // since the difference between the mean anomaly and the eccentric anomaly is small, this should be pretty quick
        let est1 = i - (eccentricity*180/Math.PI)*Math.sin(i*Math.PI/180)
        let est2 = - i + 360 - (eccentricity*180/Math.PI)*Math.sin((-i)*Math.PI/180)
        let cond1 = meanAnomaly>=0 &&(prevDif1 < Math.abs(est1-meanAnomaly) ) ||  meanAnomaly<0 && (prevDif1 < Math.abs(est1-(meanAnomaly+360))); //stop if true
        let cond2 = meanAnomaly>=0 &&(prevDif2 < Math.abs(est2-meanAnomaly) ) ||  meanAnomaly<0 && (prevDif2 < Math.abs(est2-(meanAnomaly+360))); //stop if true
        if(cond1 && cond2){
            break;
        }
        if(meanAnomaly>=0) {
            prevDif1 = Math.abs(est1-meanAnomaly)
            prevDif2 = Math.abs(est2-meanAnomaly)
            if(Math.abs(est1-meanAnomaly)<minDif) {
                minDif = Math.abs(est1-meanAnomaly)
                // minMeanAnom=est1;
                eccentricAnomaly = i;
            }
            if(Math.abs(est2-meanAnomaly)<minDif) {
                minDif = Math.abs(est2-meanAnomaly)
                // minMeanAnom=est2;
                eccentricAnomaly = - i + 360;
            }
        }
        else {
            prevDif1 = Math.abs(est1-(meanAnomaly+360))
            prevDif2 = Math.abs(est2-(meanAnomaly+360))
            if(Math.abs(est1-(meanAnomaly+360))<minDif) {
                minDif = Math.abs(est1-(meanAnomaly+360))
                // minMeanAnom=est1;
                eccentricAnomaly = i;
            }
            if(Math.abs(est2-(meanAnomaly+360))<minDif) {
                minDif = Math.abs(est2-(meanAnomaly+360))
                // minMeanAnom=est2;
                eccentricAnomaly = - i + 360;
            }
        }
    }
    
    // console.log("mindif: " + minDif)
    // console.log("mindeg: " + eccentricAnomaly)
    // console.log("minMeanAnom: " + minMeanAnom)

    const xAxis = semiMajorAxis*(Math.cos(eccentricAnomaly*Math.PI/180)-eccentricity)
    const yAxis = semiMajorAxis*Math.sqrt(1-eccentricity*eccentricity) * (Math.sin(eccentricAnomaly*Math.PI/180))
    const xEcliptic = (Math.cos(perihelion * Math.PI/180)*Math.cos(longitudeAsc*Math.PI/180)- Math.sin(perihelion*Math.PI/180) * Math.sin(longitudeAsc*Math.PI/180)*Math.cos(inclination*Math.PI/180))*xAxis +  
    (- Math.sin(perihelion*Math.PI/180) * Math.cos(longitudeAsc*Math.PI/180)- Math.cos(perihelion * Math.PI/180)*Math.sin(longitudeAsc*Math.PI/180)*Math.cos(inclination*Math.PI/180))*yAxis 
    const yEcliptic = (Math.cos(perihelion*Math.PI/180)*Math.sin(longitudeAsc * Math.PI/180)+ Math.sin(perihelion*Math.PI/180) * Math.cos(longitudeAsc*Math.PI/180)*Math.cos(inclination*Math.PI/180))*xAxis +  
     (- Math.sin(perihelion*Math.PI/180) * Math.sin(longitudeAsc*Math.PI/180) + Math.cos(perihelion*Math.PI/180)*Math.cos(longitudeAsc*Math.PI/180)*Math.cos(inclination*Math.PI/180))*yAxis 
    const zEcliptic =  Math.sin(perihelion*Math.PI/180)*Math.sin(inclination*Math.PI/180) * xAxis + Math.cos(perihelion*Math.PI/180)*Math.sin(inclination*Math.PI/180)*yAxis
    return [xEcliptic * 100, yEcliptic * 100, zEcliptic * 100]
}

const getPosition = (julianDate,
    semiMajorAxis0, semiMajorAxisCent, 
    eccentricity0, eccentricityCent,
    inclination0, inclinationCent,
    meanLongtitude0, meanLongtitudeCent, 
    longitudePeri0,longitudePeriCent,
    longitudeAsc0, longitudeAscCent,
    b=0, c=0, s=0, f=0) => {
    // Formulae from https://ssd.jpl.nasa.gov/planets/approx_pos.html
    // X, Y is the base plane

    const semiMajorAxis = semiMajorAxis0+ t* semiMajorAxisCent;
    const eccentricity = eccentricity0+ t* eccentricityCent;
    const inclination = inclination0+ t* inclinationCent;
    const meanLongtitude = meanLongtitude0+ t* meanLongtitudeCent;
    const longitudePeri = longitudePeri0+ t* longitudePeriCent;
    const longitudeAsc = longitudeAsc0+ t* longitudeAscCent;

    const perihelion = longitudePeri - longitudeAsc;

    let meanAnomaly = meanLongtitude - longitudePeri + b*t*t + c*Math.cos(f*julianDate*Math.PI/180) + s*Math.sin(f*julianDate*Math.PI/180)

    if(meanAnomaly%360>=0 && meanAnomaly%360<=180) meanAnomaly = meanAnomaly%360;
    else meanAnomaly = meanAnomaly%360 - 360;
    // console.log("meanAnomaly: deg"+meanAnomaly)

    // let minMeanAnom = 360;
    let minDif = 360;

    let eccentricAnomaly = 0;
    let prevDif1=360;
    let prevDif2=360;

    for(let i=0;i<180;i+=0.001) {
        // could be optimized, but it's already an approximated value.
        // find the eccentric anomaly by iterating from 0° to 180° and 0° to -180°
        // since the difference between the mean anomaly and the eccentric anomaly is small, this should be pretty quick
        let est1 = i - (eccentricity*180/Math.PI)*Math.sin(i*Math.PI/180)
        let est2 = - i + 360 - (eccentricity*180/Math.PI)*Math.sin((-i)*Math.PI/180)
        let cond1 = meanAnomaly>=0 &&(prevDif1 < Math.abs(est1-meanAnomaly) ) ||  meanAnomaly<0 && (prevDif1 < Math.abs(est1-(meanAnomaly+360))); //stop if true
        let cond2 = meanAnomaly>=0 &&(prevDif2 < Math.abs(est2-meanAnomaly) ) ||  meanAnomaly<0 && (prevDif2 < Math.abs(est2-(meanAnomaly+360))); //stop if true
        if(cond1 && cond2){
            break;
        }
        if(meanAnomaly>=0) {
            prevDif1 = Math.abs(est1-meanAnomaly)
            prevDif2 = Math.abs(est2-meanAnomaly)
            if(Math.abs(est1-meanAnomaly)<minDif) {
                minDif = Math.abs(est1-meanAnomaly)
                // minMeanAnom=est1;
                eccentricAnomaly = i;
            }
            if(Math.abs(est2-meanAnomaly)<minDif) {
                minDif = Math.abs(est2-meanAnomaly)
                // minMeanAnom=est2;
                eccentricAnomaly = - i + 360;
            }
        }
        else {
            prevDif1 = Math.abs(est1-(meanAnomaly+360))
            prevDif2 = Math.abs(est2-(meanAnomaly+360))
            if(Math.abs(est1-(meanAnomaly+360))<minDif) {
                minDif = Math.abs(est1-(meanAnomaly+360))
                // minMeanAnom=est1;
                eccentricAnomaly = i;
            }
            if(Math.abs(est2-(meanAnomaly+360))<minDif) {
                minDif = Math.abs(est2-(meanAnomaly+360))
                // minMeanAnom=est2;
                eccentricAnomaly = - i + 360;
            }
        }
    }
    
    // console.log("mindif: " + minDif)
    // console.log("mindeg: " + eccentricAnomaly)
    // console.log("minMeanAnom: " + minMeanAnom)

    const xAxis = semiMajorAxis * (Math.cos(eccentricAnomaly*Math.PI/180)-eccentricity)
    const yAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity)*(Math.sin(eccentricAnomaly*Math.PI/180))
    const xEcliptic = (Math.cos(perihelion*Math.PI/180) * Math.cos(longitudeAsc*Math.PI/180)- Math.sin(perihelion * Math.PI/180) * Math.sin(longitudeAsc*Math.PI/180) * Math.cos(inclination*Math.PI/180)) * xAxis +  
    (- Math.sin(perihelion*Math.PI/180)*Math.cos(longitudeAsc*Math.PI/180) - Math.cos(perihelion*Math.PI/180)*Math.sin(longitudeAsc*Math.PI/180)*Math.cos(inclination*Math.PI/180))*yAxis 
    const yEcliptic = (Math.cos(perihelion*Math.PI/180) * Math.sin(longitudeAsc*Math.PI/180)+ Math.sin(perihelion*Math.PI/180) * Math.cos(longitudeAsc * Math.PI/180) * Math.cos(inclination * Math.PI/180)) * xAxis +  
     (- Math.sin(perihelion*Math.PI/180)*Math.sin(longitudeAsc*Math.PI/180)+ Math.cos(perihelion*Math.PI/180) * Math.cos(longitudeAsc*Math.PI/180) * Math.cos(inclination * Math.PI/180))*yAxis 
    const zEcliptic =  Math.sin(perihelion*Math.PI/180) * Math.sin(inclination*Math.PI/180) * xAxis + Math.cos(perihelion*Math.PI/180)*Math.sin(inclination*Math.PI/180)*yAxis
    return [xEcliptic * 100, yEcliptic * 100, zEcliptic * 100]
}