bool limitSwitchON = false;
// current state of limit switch: True/False
int angleCounter = 0;

for (int i = 0; i < 95; i++)
{
    // 95 loops instead of 90 to account for limit switch inaccuracies
    if (limitSwitchON)
    {
        break;
    }
    angleCounter++;
    motor->turnCCW(round((1) * 2048 / 360));
    // Turn motor one degree toward limit switch
}
motor->turnCW(
    round((angleCounter)*2048 / 360));
// Move motor back to original angle

int currentAngle = angleCounter;
// Set current angle in code to counter value
