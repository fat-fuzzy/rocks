# CSS Tokens

Shadow and gradient colors are based on the main color base, converted to hsl:

```json
{
	"shadow": {
		"$type": "color",
		"000": {
			"$value": "hsl(254.96 90% 60%)", // primary:300 (I think, or 400)
			"$extensions": {
				"mode": {
					"day": "hsl(254.96 90% 60%)", // primary:300 (I think, or 400)
					"night": "hsl(254.96 90% 80%)" // 80% lightened
				}
			}
		}
	},
	"gradient": {
		"$type": "color",
		"000": {
			"start": {"$value": "hsl(329.3 100% 52%)"}, // highlight:300
			"middle": {"$value": "hsl(248.37 100% 73%)"}, // primary:200
			"end": {"$value": "hsl(188.19 93% 74%)"} // accent:200
		}
	}
}
```
