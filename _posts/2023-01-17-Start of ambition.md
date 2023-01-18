---
layout: post
title: Start of Ambition
---

The task I came up with was to create a visually appealing rhythm game with an eerie and minimalistic theme, inspiration drawn from abstract art mainly due to lacking 3D modeling, but luckily cubes and simple geometry can be made to look nice using lighting and other small tricks.

----

I forked the original project from an existing university project that I had made because I already had the structure of the beatmap file and parsing ready. Even though this seems like a good setup to start from, I'd have to revamp majority of the code in order for it to fit what I've planned. For example I had written a converter that converts song timing points from another game called *osu!* into my own *beatmap* format. This unfortunately won't be used as the map files will differ so much that generating a playable level from osu! beatmap would not match the design gameplay-wise. So all in all, not sure why I'd fork the project if I'd remake everything anyways, but its nice to have some reference on how I used to do it.

----

Designing various parts of the game would be challenging as I'd want to make it as modular and dynamic as possible. Of course this isn't always possible due to restrictions with time vs how much effort I'd have to put into it but I'll try to find a good middle road.

## Song Timeline System

No matter what the game will be, it will still be designed around the timeline and timings. While this has already been done in the existing project, I'll still have to refractor it into a state that would work reliably. But also the timing point system would have to stay seperate from the actual gamemodes as the gamemode script would call the timing manager and not be baked into the gamemode script itself, this way switching different types of gamemodes in the middle of the song would seem more possible.

<sub>Below how the timing points used to look like when baked with the actual gamemode.</sub>
{% highlight cs %}

void FixedUpdate()      
{
    if (gameState == GameState.InPlay)
    {
        time += 1000 * Time.deltaTime;
        if (songNoteIndex < song.Notes.Count)
        {
            float distanceToTravel = Vector3.Distance(spawnPoint[lane], catcherObjectList[lane].transform.position);
            float approachTime = (distanceToTravel / approachSpeed) * 1000; //time is multiplied by 1000 so we have to multiply all time related variables by 1000.
            if (time >= song.Notes[songNoteIndex].timing - approachTime)
            {
                lane = song.Notes[songNoteIndex].key;
                GameObject a = Instantiate(itemList[Random.Range(0, itemList.Count)], spawnPoint[lane], Quaternion.identity);

                notesOnScreenList.Add(a);

                NoteBehaviour cb = a.GetComponent<NoteBehaviour>();
                cb.lane = lane;
                a.transform.position = spawnPoint[lane];
                cb.movement = new Vector3(0, -approachSpeed, 0);
                songNoteIndex++;
            }
            if (AutoPlay)
            {
                if (time >= song.Notes[autoIndex].timing)
                {
                    StartCoroutine(HandleKey(catcherObjectList[song.Notes[autoIndex].key]));
                    autoIndex++;
                }
            }
        }
        else
        {
            if (notesOnScreenList.Count == 0)
            {
                //finish
                gameState = GameState.ScoreScreen;
                FinishGame();
            }
        }
    }
}

{% endhighlight %}

