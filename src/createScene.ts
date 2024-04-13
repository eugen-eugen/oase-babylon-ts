import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF'
import * as MATERIALS from '@babylonjs/materials/sky'
import oaseModel from '../assets/oase.glb?url'


class Playground {
  public static CreateScene(
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement
  ): BABYLON.Scene {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
     var box = BABYLON.MeshBuilder.CreateBox('SkyBox', {size:1000, sideOrientation:BABYLON.Mesh.BACKSIDE}, scene);
     const skyMaterial = new MATERIALS.SkyMaterial("skyMaterial", scene);
     skyMaterial.inclination = 0;
     box.material = skyMaterial;
    const anaglyphArcRotateCamera = new BABYLON.AnaglyphArcRotateCamera("anaglyphCam", 0, 45/180*Math.PI, 0, new BABYLON.Vector3(10, 5, 0), 0.001, scene);
    
    let oase=BABYLON.SceneLoader.ImportMeshAsync("", oaseModel, "", scene)
   
    let onRendering=new BABYLON.Observable();
    scene.onBeforeRenderObservable.add(()=>{
          onRendering.notifyObservers(0)
        });

    // This attaches the camera to the canvas
    anaglyphArcRotateCamera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight(
      'light1',
      BABYLON.Vector3.Up(),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1;


    for (let index = 0; index < 100; index++) {
      
          let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
          sphere.position=BABYLON.Vector3.Random(0, 0);
          const randomColor = new BABYLON.StandardMaterial("", scene);
          randomColor.diffuseColor=BABYLON.Color3.Random();
          sphere.material=randomColor;
          onRendering.add(()=>{
              sphere.position=sphere.position.add(BABYLON.Vector3.Random(-0.1, 0.1))
            }
          );
      }
    const red = new BABYLON.StandardMaterial("red", scene);


    // Our built-in 'ground' shape. Params: name, options, scene
    var ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 6, height: 6 },
      scene
    );

    return scene;
  }
}

export { Playground };
