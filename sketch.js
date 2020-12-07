var canvas;
var alien, alienAnimation;
var ground;
var gameBackground, backgroundImage;
var apple;
var plant1, plant2, plantImage1, plantImage2, plantsGroup;

function preload()
{
    //Load alien assets.
    alienAnimation = loadAnimation("images/alien_01.png", "images/alien_02.png",
        "images/alien_03.png", "images/alien_04.png", "images/alien_05.png",
        "images/alien_06.png", "images/alien_07.png", "images/alien_08.png",
        "images/alien_09.png", "images/alien_10.png", "images/alien_11.png",
        "images/alien_12.png", "images/alien_13.png");

    //Load background image.
    backgroundImage = loadImage("images/jungle.png");

    //Load plant assets.
    plantImage1 = loadImage("images/plant1.png");
    plantImage2 = loadImage("images/plant2.png");
}

function setup()
{
    //Create play area.
    canvas = createCanvas(displayWidth - 300, displayHeight - 200);
    canvas.position(20, 20);

    //Create sprite for game background.
    gameBackground = createSprite(0, 0, width, height);
    gameBackground.addImage(backgroundImage);
    gameBackground.scale = 2.5;
    gameBackground.x = gameBackground.width / 2;

    //Create invisible ground.
    ground = createSprite(0, height - 50, width * 2, 10);
    ground.visible = false;

    //Create alien.
    alien = createSprite(100, height - 150);
    alien.addAnimation("running", alienAnimation);
    alien.scale = 0.3;

    //Create plants group.
    plantsGroup = new Group();
}

function draw()
{
    //Clear the screen and paint it.
    background("black");

    //Move the background infinitely.
    gameBackground.velocityX = -3;
    if(gameBackground.x < 0)
    {
        gameBackground.x = gameBackground.width / 2;
    }

    //Jump alien as high as possible.
    if(keyDown("space"))
    {
        alien.velocityY = -12;
    }

    //Add gravity fort the alien.
    alien.velocityY = alien.velocityY + 0.8;

    //Spawn the vines randomly.
    spawnVines();

    //Support alien on the invisible ground.
    alien.collide(ground);

    //Display the sprites.
    drawSprites();
}

//Create the viscous plants every few frames.
function spawnVines()
{
    // Spawn plant 1.
    if(frameCount % 150 === 0)
    {
        plant1 = createSprite(width, height - 100);
        plant1.addImage(plantImage1);
        plant1.scale = 0.5;
        plant1.velocityX = -4;
        plant1.lifetime = width / Math.abs(plant1.velocityX);
        plantsGroup.add(plant1);
    }

    //Spawn plant 2.
    if(frameCount % 250 === 0)
    {
        plant2 = createSprite(width, 100);
        plant2.addImage(plantImage2);
        plant2.scale = 0.6;
        plant2.velocityX = -4;
        plant2.lifetime = width / Math.abs(plant2.velocityX);
        plantsGroup.add(plant2);
    }

    //If both plants appear together, then remove any one.
    if(frameCount % 150 === 0 && frameCount % 250 === 0)
    {
        var rand = Math.round(random(1, 2));
        if(rand === 1)
        {
            plant1.lifetime = 0;
        }
        if(rand === 2)
        {
            plant2.lifetime = 0;
        }
    }
}