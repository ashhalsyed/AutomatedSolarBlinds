int calculateOptimalAngle()
// Function for performing the sweep and outputing the optimal angle
{
    int currentAngle = 0;
    // the current angle can be any angle

    int angleVoltage[90];
    int optimalAngle = 0;
    int voltage = 0;

    motor->turnCW(round((90 - currentAngle) * 2048 / 360));
    // move to 90 degrees

    for (int i = 90; i > 0; i--)
    {
        voltage = analogRead(voltPin);
        angleVoltage[i] = voltage;
        motor->turnCCW(round((1) * 2048 / 360));
    }
    // perform sweep from 90 to 0 degrees

    for (m = 0; m < 91; m++)
    {
        if (angleVoltage[m] > optimalAngle)
            optimalAngle = angleVoltage[m];
    }
    // determine max angle

    currentAngle = 0;
    // set current angle to 0 in code

    return optimalAngle;
}
