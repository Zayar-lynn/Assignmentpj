import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    removeBtn: {
        marginTop: hp(3),
        backgroundColor: 'skyblue',
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        borderRadius: 9,
        elevation: 20,
        shadowColor: '#52006A',
    }
});
export default styles;