//
//  AdBind.h
//  flappy
//
//  Created by waynelu on 14-3-11.
//
//

#ifndef __flappy__AdBind__
#define __flappy__AdBind__
#include <string>
#include <stdint.h>
#include <iostream>


class AdBind
{
public:
    std::string  showAd();
    void hideAd();
    AdBind() {};
    ~AdBind() {};
    bool adIsShow;
};
#endif
/* defined(__flappy__AdBind__) */
